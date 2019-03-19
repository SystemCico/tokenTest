let express = require('express');
let router = express.Router();
let models = require('./models/models');
let TestDemo = models.Demo;
let User = models.User;
const jwt = require('jsonwebtoken');
let jwtVerify = require('express-jwt');
let path = require('path');
let fs = require('fs');
let public_token_key = path.normalize(__dirname + '../../../token_key/public_token_key.pem');
let secret = fs.readFileSync(public_token_key);
let isToken = require('./utils/token_util');//TODO token相关
let lockUtil = require('./utils/pwd_lock_util');//TODO 用户密码：解密、加密
let reset = require('./utils/reset');
let warn = require('./utils/warn');

/**
 * 登陆
 * 密码连续错误3次，5分钟后才能登陆
 * 密码连续错误4次，10分钟后才能登陆
 * 密码连续错误5次，账号锁定--无法登陆
 */
router.post('/', function (req, res) {
    let userName = req.body.userName;
    let password = req.body.password;

    async function fun() {
        let user = await User.findOne({$or: [{'userName': userName}, {'phone': userName}]});
        if (user) {  // TODO 数据库是否存在这条数据
            if (user.lock) {//TODO true:账号被冻结/false:正常
                res.json({status: 903, msg: '此账号被冻结，请联系管理员做相关操作!'})
            } else {
                let dbPwd = await lockUtil.decrypt(user.password);//TODO 解密
                if (password == dbPwd) {//TODO 判断密码是否正确
                    reset.login_number(user);//TODO 异步操作，重置登陆次数
                    let payload = {};
                    payload['name'] = user.name;
                    payload['phone'] = user.phone;
                    payload['role'] = user.role;
                    let token = await isToken.addToken(payload);//TODO 生成token
                    res.json({status: 200, msg: '登录成功', data: user, token: token});
                } else {
                    // TODO 警告信息
                    let message = await warn.login_user(user);
                    res.json({status: 903, msg: message});
                }
            }
        } else {
            res.json({status: 902, msg: '登陆失败,没有此用户'});
        }
    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 901, msg: '出错啦', err: err});
    })

});

/**
 * 添加中间键'express-jwt'用于验证接口token是否有效
 */
router.get('/get-user', jwtVerify({secret: secret}), function (req, res) {
    async function fun() {
        let demo = await User.find();
        res.json({status: 200, msg: '查询结果', data: demo});
    }

    fun().catch(err => {
        console.log(err);
        res.json({status: 901, msg: '出错啦', err: err});
    })

});


module.exports = router;