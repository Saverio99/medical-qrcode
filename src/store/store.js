const uuid = require('uuid');
const { decrypt } = require('../crypt/cryptography');

let map = new Map();

/**
 * The method store encryped message into a map and return the corrispondent UUID 
 * @param {message} - The message you want to store in map
 * @return {UUID} The UUID of the message
 */
function storeEncryptedMessage(message){
    const id = uuid.v4() 
    map.set(id, message);
    return id;
}

/**
 * The method return decrypted message by is UUID
 * @param {id} - The UUID we serach by
 * @return {decrypted} The decrypted message
 */
function getEncryptedMessage(id){
    const encryptedMessage = map.get(id);
    const decryptedMessage = decrypt(encryptedMessage);
    return decryptedMessage;
}

module.exports = {storeEncryptedMessage, getEncryptedMessage}