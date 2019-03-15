let express = require('express');
let models = require('../models/models');
let User = models.User;

/**
 * 登陆成功后--重制登陆次数
 */
function login_number(user) {
    console.log('进入重置用户登陆次数方法');
    user.num = 1;
    user.save();
}


/**
 * 登陆失败后锁定账户(暂时锁定/永久锁定)
 *
 */
function lock_user(userId, time) {
    console.log('进入锁定方法');
    User.findOne({'_id': userId}).then(result => {
        if (result) {
            result.lock = true;
            result.save();
            unlock(userId, time);
        } else {
            console.log('锁定用户出错，代码出错');
        }
    }).catch(err => {
        console.log(err);
    });
}

/**
 * 解锁账号
 *
 */
function unlock(userId, time) {
    setTimeout(function () {
        User.findOne({'_id': userId}).then(result => {
            if (result) {
                result.lock = false;
                result.save();
            } else {
                console.log('解锁用户出错，代码出错');
            }
        })

    }, time);
}

module.exports = {
    login_number,
    lock_user
};
