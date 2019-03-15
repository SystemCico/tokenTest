let express = require('express');
let router = express.Router();
let models = require('./models/models');
let User = models.User;
const jwt = require('jsonwebtoken');
let jwtVerify = require('express-jwt');
var md5 = require("md5");
const secret = 'LOVE_LUCIFER_A2';
var NodeRSA = require('node-rsa')
var fs = require('fs');
let lockUtil = require('./utils/pwd_lock_util');

/**
 * 添加平台用户
 */
router.post('/createUser', function (req, res) {
    let passage = {};
    let password = req.body.password;
    let name = req.body.name;
    let userName = req.body.userName;
    let phone = req.body.phone;
    let role = req.body.role;
    let lock=false;
    let num=0;
    if (!(password)) {
        password = '123456';
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
        let docs_userName = await User.find({"userName":userName});
        let docs_phone=await User.find({"phone":phone});
        if(docs_userName.length>0){
            res.json({status:903,msg:'用户名重复'});
        }else if(docs_phone.length>0){
            res.json({status:903,msg:'手机号码重复'});
        }else{
            //TODO 加密密码
            password = await lockUtil.encrypt(password);
            passage['password'] = password;
            passage['num']=num;
            passage['lock']=lock;
            let user = await User.create(passage);
            res.json({status: 200, msg: '新建用户成功', data: user});
        }
    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 902, msg: '新建用户失败', err: err});
    })
});


/**
 * 添加中间键'express-jwt'用于验证接口token是否有效
 */
router.get('/testFind', jwtVerify({secret: secret}), function (req, res) {
    async function fun() {
        let demo = await TestDemo.find();
        res.json({status: 200, msg: '查询结果', data: demo});

    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 901, msg: '出错啦', err: err});
    })

});


module.exports = router;