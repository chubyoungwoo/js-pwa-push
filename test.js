const crypto = require('crypto')

// node 암호화 모듈
function generateVAPIDKeys() {  
  var curve = crypto.createECDH('prime256v1');  
  curve.generateKeys();

  return {  
    publicKey: curve.getPublicKey(),  
    privateKey: curve.getPrivateKey(),  
  };  
}


console.log(generateVAPIDKeys())