let express = require('express');
let router = express.Router();
let models = require('../models/models');
let smsModels = require('../models/sms');
let config = require('../../../config');
let Sms = smsModels.Sms;
const Core = require('@alicloud/pop-core');
let randomUtile = require('./randomUtil');
let mongoose = require('../config/config').mongoose;
let client = new Core({
    accessKeyId: config.accessKeyId,//TODO 密钥
    accessKeySecret: config.accessKeySecret,//TODO 密钥
    endpoint: config.endpoint,//TODO 地址
    apiVersion: config.apiVersion //TODO 阿里云对应版本的参数，注意：修改直接报错！
});

let requestOption = {
    method: 'POST'
};

/**
 * 添加用户--发送短信验证码
 */
async function sendSms(phone) {
    let smsId = mongoose.Types.ObjectId();
    let code = await randomUtile.randomString(6, 1);
    let params = {};
    params['_id'] = smsId;//TODO 生成_id
    params['RegionId'] = config.RegionId;//TODO 对应国家地区
    params['PhoneNumbers'] = phone;//TODO 接收短信的手机号码
    params['SignName'] = config.SignName;//TODO 发送短信的标题
    params['TemplateCode'] = config.TemplateCode;//TODO 对应模版
    params['TemplateParam'] = code;//TODO 验证码存数据库
    params['againSend'] = true;//TODO false：可以再次发送  true：不能发送
    params['Verification_Code_Invalid'] = false;//TODO false:有效，true:失效
    params['type'] = 1;//TODO 添加用户类型
    await Sms.create(params);//TODO 发送短信同步保存到数据库
    //TODO 异步调用一个方法 三分钟之后把againSend状态改成false；
    params['TemplateParam'] = "{code:" + code + "}";//TODO 拼接验证码
    client.request('SendSms', params, requestOption).then((result) => {
        console.log(result);
        console.log('手机号码已被锁定,三分钟后能再次接收短信');
        let timeout1 = setTimeout(function () {
            updateSms(smsId);
        }, 180000);//TODO 3分钟后短信才能再次发送
        console.log('短信验证码已锁定，15分钟后过期');
        let timeout2 = setTimeout(function () {
            Verification_Code(smsId);
        }, 900000);//TODO 15分钟后短信验证码过期
    }, (ex) => {
        console.log(ex);
    });
}


/**
 * 重置短信发送
 */
async function updateSms(smsId) {
    let sms = await Sms.findOne({'_id': smsId});
    if (sms) {
        sms['againSend'] = false;
        await sms.save();
        console.log('号码：' + sms['PhoneNumbers'] + '能再次发送验证码了');
    } else {
        console.log("updateSms err");
    }
}

/**
 * 验证码失效
 */
async function Verification_Code(smsId) {
    let sms = await Sms.findOne({'_id': smsId});
    if (sms) {
        sms['Verification_Code_Invalid'] = true;
        await sms.save();
        console.log('号码：' + sms['PhoneNumbers'] + '验证码失效' + sms['TemplateParam']);
    } else {
        console.log("Verification_Code err");
    }
}


module.exports = {
    sendSms
};