let models = require('../models/models');
let User = models.User;
let reset = require('./reset');


function login_user(user) {
    console.log('请注意：有用户正在进行非法操作！');
    let massage = "";
    let data = new Promise((resolve, reject) => {
        switch (user.num) {
            case 1:
                massage = '登陆失败,密码错误';
                break;
            case 2:
                massage = '登陆失败,密码错误(第' + user.num + '次输错密码)【警告】:连续三次输错密码,系统将冻结您的账号【5分钟】';
                break;
            case 3:
                massage = '登陆失败,密码错误(第' + user.num + '次输错密码)【警告】:您的账号已被冻结【5分钟后解锁】';
                reset.lock_user(user._id, 300000);
                break;
            case 4:
                massage = '登陆失败,密码错误(第' + user.num + '次输错密码)【警告】:您的账号已被冻结【10分钟后解锁】';
                reset.lock_user(user._id, 600000);
                break;
            case 5:
                massage = '登陆失败,密码错误(第' + user.num + '次输错密码)【警告】:您的账号已被冻结【请联系管理员解锁】';
                user.lock = true;
                break;
            default:
                massage = '【警告】:您的账号已被冻结【请联系管理员解锁】';
                break;
        }
        user.num += 1;
        user.save();
        resolve(massage);
    });
    return data;
}


module.exports = {
    login_user
};