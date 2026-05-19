// load .env file
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const crypto = require('crypto');
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // read KEY form .env
const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12; // inizialization vector


/**
 * Encrypt the input text.
 *
 * @param {text} text The text you want encrypt.
 * @returns {Object} An object representing the iv (Inizialization Vector), the tag and the content of the encrypted text.
 */
function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGO, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final()
    ]);

    const tag = cipher.getAuthTag(); 

    return {
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        content: encrypted.toString('hex')
    };
}

/**
 * Dencrypt the input text.
 *
 * @param {text} text The text you want decrypt.
 * @returns {Object} The decrypted text.
 */
function decrypt(data) {
    const decipher = crypto.createDecipheriv(
        ALGO,
        KEY,
        Buffer.from(data.iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(data.tag, 'hex'));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(data.content, 'hex')),
        decipher.final()
    ]);

    return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };