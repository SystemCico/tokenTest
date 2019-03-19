let express = require('express');
let router = express.Router();
let models = require('./models/models');
let smsModels = require('./models/sms');
let User = models.User;
let Sms = smsModels.Sms;
let sendSms = require('./utils/sendSms');
const jwt = require('jsonwebtoken');
let jwtVerify = require('express-jwt');
let fs = require('fs');
let md5 = require("md5");
let path = require('path');
let public_token_key = path.normalize(__dirname + '../../../token_key/public_token_key.pem');
const secret = fs.readFileSync(public_token_key);
let NodeRSA = require('node-rsa');

let lockUtil = require('./utils/pwd_lock_util');


/**
 * 添加平台用户（一）
 */
router.post('/sendSms', function (req, res) {
    let phone = req.body.phone;
    async function fun() {
        if (phone) {
            let user=await User.findOne({"phone":phone});
            if(user){
                res.json({status:907,msg:'警告：此手机号码已被注册'});
            }else{
                //TODO 进入发送验证码方法
                try {
                    let sms = await Sms.find({'PhoneNumbers': phone, 'type': 1}).sort({_id: -1});
                    if (sms.length > 0) {//TODO 有记录 查询最新一条记录--对比
                        if (sms[0].againSend) {//TODO (三分钟内同一个手机只能发一条)
                            res.json({status: 905, msg: '很抱歉，三分钟内您不能重复操作'});
                        } else {
                            sendSms.sendSms(phone);
                            res.json({status: 200, msg: '短信已发送，请老哥查收'});
                        }
                    } else {//TODO 没有记录--直接添加
                        sendSms.sendSms(phone);
                        res.json({status: 200, msg: '短信发送中，请大佬查收'});
                    }
                } catch (e) {
                    console.log(e);
                    res.json({status:400,msg:'sendSms err',err:e});
                }
            }

        } else {
            res.json({status: 904, msg: '没有输入手机号码！'});
        }
    }
    fun().catch(err => {
        console.log(err);
        res.json({status: 902, msg: '新建用户失败', err: err});
    })
});

/**
 * 添加平台用户（二）
 */
router.post('/createUser', function (req, res) {
    let passage = {};
    let password = req.body.password;
    let name = req.body.name;
    let userName = req.body.userName;
    let phone = req.body.phone;
    let role = req.body.role;
    let lock = false;
    let code=req.body.code;
    let num = 0;
    if (!(password)) {
        password = '654321';
    }
    if (name) {
        passage['name'] = name;
    }
    if (userName) {
        passage['userName'] = userName;
    }
    if (phone) {
        passage['phone'] = phone;
    }
    if (role) {
        passage['role'] = role;
    }
    async function fun() {
        if(code){
            let sms=await Sms.findOne({'PhoneNumbers':phone,'TemplateParam':code,'Verification_Code_Invalid':false});
            if(sms){//TODO 验证码有效直接注册
                let docs_userName = await User.find({"userName": userName});
                let docs_phone = await User.find({"phone": phone});
                if (docs_userName.length > 0) {
                    res.json({status: 903, msg: '用户名重复'});
                } else if (docs_phone.length > 0) {
                    res.json({status: 903, msg: '手机号码重复'});
                } else {
                    //TODO 加密密码
                    password = await lockUtil.encrypt(password);
                    passage['password'] = password;
                    passage['num'] = num;
                    passage['lock'] = lock;
                    let user = await User.create(passage);
                    res.json({status: 200, msg: '新建用户成功', data: user});
                }
            }else{//TODO 无效，无法注册
                res.json({status: 907, msg: '新建用户失败，验证码失效'});
            }
        }else{
            res.json({status: 906, msg: '新建用户失败，未填写验证码'});
        }

    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 902, msg: '新建用户失败', err: err});
    })
});


module.exports = router;