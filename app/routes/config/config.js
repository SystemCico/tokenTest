var mongoose =require('mongoose');
let configJson=require('../../../config');

if(configJson['Edition']=="development"){
    console.log("************************** development Loading ***************************");
}else if(configJson['Edition']=="test"){
    console.log("************************** test.js Loading ***************************");
}else if(configJson['Edition']=="production"){
    console.log("************************** production Loading ***************************");
}else{
    throw new Error('config.json error.Please check the file : config.json');
}

let user = configJson.user;
// console.log(user);
let pass = configJson.pass;
// console.log(pass);
let appport=configJson.appport;
// console.log(appport);

let url=configJson.url;
let options = {
    user: user,
    pass:pass,
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    poolSize: 100, // Maintain up to 10 socket connections
};
console.log(url);
mongoose.Promise = require('bluebird');
mongoose.connect(url, options);







exports.mongoose = mongoose;
exports.appport = appport;



