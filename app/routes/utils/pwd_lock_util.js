let fs = require('fs');
let path = require('path');
let NodeRSA = require('node-rsa');

/**
 * 密码：加密
 *
 *
 */
function encrypt(pwd) {
    let promise = new Promise((resolve, reject) => {
        let encrypt_pwd_key = path.normalize(__dirname + '../../../../pwd_key/private_pwd_key.pem');
        fs.readFile(encrypt_pwd_key, function (err, data) {
            let key = new NodeRSA(data);
            let cipherText = key.encryptPrivate(pwd, 'base64');
            resolve(cipherText)
        });
    });
    return promise;

}

/**
 * 密码：解密
 *
 *
 */
function decrypt(pwd) {
    let promise = new Promise((resolve, reject) => {
        let decrypt_pwd_key = path.normalize(__dirname + '../../../../pwd_key/public_pwd_key.pem');
        fs.readFile(decrypt_pwd_key, function (err, data) {
            let key = new NodeRSA(data);
            let rawText = key.decryptPublic(pwd, 'utf8');
            console.log(rawText);
            resolve(rawText);
        });
    });
    return promise;
}
// decrypt('Dt9o2PXi++rHDVSfrHe2QR6/y2PSg8B1E1Tu9xyOdjYXDQHNOcO3DdlriaMdFKZhnWkLi62VpxCH1OQAa/4VYg==');
module.exports = {
    encrypt,
    decrypt
};