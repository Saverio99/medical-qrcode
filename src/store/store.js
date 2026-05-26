const uuid = require('uuid');
const { decrypt } = require('../crypt/cryptography');
const prisma = require('./prismaClient');

/**
 * The method store encryped message into DB and return the corrispondent UUID 
 * @param {string} userId - L'id dell'utente proprietario
 * @param {message} message - The message you want to store in map
 * @return {UUID} The UUID of the message
 */
async function storeEncryptedMessage(userId, message){
    const profile = await prisma.medicalProfile.create({
        data: {
            data: message.content,
            iv: message.iv,
            tag: message.tag,
            userId: userId
        }
    });
    return profile.id;
}

/**
 * The method search and return decrypted message by is UUID from DB
 * @param {id} - The UUID we serach by
 * @return {decrypted} The decrypted message
 */
async function getEncryptedMessage(id){
        const profile = await prisma.medicalProfile.findUnique({
        where: { id }
    });
    if (!profile) return null;
    return {
        content: profile.data,
        iv: profile.iv,
        tag: profile.tag
    };
}

module.exports = {storeEncryptedMessage, getEncryptedMessage}