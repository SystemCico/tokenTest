/**
 * Created by liuqiang on 2019/2/18.
 */



let mongoose = require('../config/config').mongoose;

//调用例子：
// var models=require('./models/models');
// var demo=models.demo
let ObjectId = mongoose.Schema.Types.ObjectId;

//测试用表
let demoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userName: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true}

});
exports.Demo = mongoose.model('Demo', demoSchema);


let userSchema = new mongoose.Schema({
    name: {type: String, required: true},//TODO 用户名称
    userName: {type: String, required: true, unique: true},//TODO 用户名（主要用于登陆）
    phone: {type: String, required: true, unique: true},//TODO 联系人手机号码（可用于登陆）
    password: {type: String, required: true},//TODO 密码
    role: {type: String, required: true},//TODO 角色(超级管理员，店家，家长)
    num: {type: Number, required: true},//TODO 密码错误次数
    lock: {type: Boolean, required: true}//TODO 用户是否被冻结
});
exports.User = mongoose.model('User', userSchema);


