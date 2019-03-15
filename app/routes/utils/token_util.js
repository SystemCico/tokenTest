const jwt = require('jsonwebtoken');
let fs = require('fs');
let path = require('path');

/**
 * token解密
 * 通过：返回  用户集合
 * 失败：返回  0
 */
function verifyToken(token){
    let public_token_key = path.normalize(__dirname + '../../../../token_key/public_token_key.pem');
    let publicKey = fs.readFileSync(public_token_key);
    let promise=new Promise((resole,reject)=>{
        jwt.verify(token,publicKey,(error,decoded)=>{
            if(!error){
                resole(decoded)
            }else{
                reject(error);
            }
        })
    });
    return promise;
}

/**
 * 获取token
 *
 */
function addToken(payload){
    let promise=new Promise((resolve ,reject)=>{
        let private_token_key = path.normalize(__dirname + '../../../../token_key/private_token_key.pem');
        let privateKey = fs.readFileSync(private_token_key);
        let token = jwt.sign(payload,privateKey,{ expiresIn: '1 days', algorithm: 'RS256' });
        resolve(token);
    });
    return promise
}


// verifyToken();
module.exports = {
    verifyToken,
    addToken
};
