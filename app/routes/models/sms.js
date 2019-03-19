/**
 * Created by liuqiang on 2019/3/19.
 */



let mongoose = require('../config/config').mongoose;

/**
 * 发送短信数据模型
 *
 */
let smsSchema = new mongoose.Schema({
    RegionId: {type: String, required: true},//TODO 对应国家地区
    PhoneNumbers: {type: String, required: true},//TODO 接收短信的手机号码
    SignName: {type: String, required: true},//TODO 发送短信的标题
    TemplateCode: {type: String, required: true},//TODO 对应模版
    TemplateParam: {type: String, required: true},//TODO 拼接内容
    againSend: {type: Boolean, required: true},//TODO 是否还能重复发送(注意：三分钟内，同一个手机只能发送一条)
    Verification_Code_Invalid: {type: Boolean, required: true},//TODO 验证码是否失效,
    type: {type: Number, required: true},//TODO 1：创建用户的验证码，2：修改密码的验证码，3：其他类型短信
});

exports.Sms = mongoose.model('Sms', smsSchema);

