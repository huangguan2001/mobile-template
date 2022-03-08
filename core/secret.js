const CryptoJS = require('crypto-js'); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123413'); //十六位十六进制数作为密钥偏移量
const cbc = CryptoJS.mode.CBC;
const Pkcs7 = CryptoJS.pad.Pkcs7;

//解密方法
function Decrypt(word) {
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: cbc,
    padding: Pkcs7,
  });
  // return CryptoJS.enc.Utf8.stringify(decrypt);
  return decrypt.toString(CryptoJS.enc.Utf8);
}

//加密方法
function Encrypt(word) {
  let encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: cbc,
    padding: Pkcs7,
  });
  return encrypted.toString();
}
export default {
  Decrypt,
  Encrypt,
};
