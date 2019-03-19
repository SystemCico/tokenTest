


/**
 * Created by liuqiang on 2019/3/19.
 */



let mongoose = require('../config/config').mongoose;


let smsSchema = new mongoose.Schema({
    RegionId: {type: String, required: true},//TODO 对应国家地区
    PhoneNumbers: {type: String, required: true},//TODO 接收短信的手机号码
    SignName: {type: String, required: true},//TODO 发送短信的标题
    TemplateCode: {type: String, required: true},//TODO 对应模版
    TemplateParam: {type: String, required: true},//TODO 拼接验证码
    againSend:{type:Boolean,required:true}//TODO 是否还能重复发送(注意：60秒内，同一个手机只能发送一条)
});

exports.Sms = mongoose.model('Sms', smsSchema);

