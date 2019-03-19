let randomstring = require("randomstring");

/**
 *
 * @param length 随机数长度
 * @param type  随机数类型：1、纯数字2、纯字母3、数字+字母
 */
function randomString(length,type) {
    let code="";
    let promise=new Promise((resolve,reject)=>{
        switch (type){
            case 1:
                code=randomstring.generate({length: length,charset:'numeric'});
                // console.log(randomstring.generate({length: length,charset:'numeric'}));
                break;
            case 2:
                code=randomstring.generate({length: length,charset:'alphabetic'});
                // console.log(randomstring.generate({length: length,charset:'alphabetic'}));
                break;
            case 3:
                code=randomstring.generate({length: length,charset:'alphanumeric'});
                // console.log(randomstring.generate({length: length,charset:'alphanumeric'}));
                break;
        }
        resolve(code);

    });
    return promise;
}



module.exports = {
    randomString
};