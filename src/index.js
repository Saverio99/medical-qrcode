var QRCode = require('qrcode');

/**
 * The function generate a QRCode SVG from some text
 * @param {text} - The text you wnat to tranform in qrCode
 * @return {utl} The QRCode SVG 
 */
async function generateQRCodeSVG(text){
    try {
        const svg =  await QRCode.toDataURL(text);
        console.log(svg + "\n");
        return svg;   
    } catch (error) {
        console.log("Some error: ", error);
        throw error;
    }
}

/**
 * The function generate a QRCode string from some text
 * @param {text} - The text you wnat to tranform in qrCode
 * @return {utl} The QRCode url 
 */
async function generateQRCodeString(text){
    try {
        const url =  await QRCode.toString(text);
        console.log(url);   
    } catch (error) {
        console.log("Some error: ", error);
        throw error;
    }
}

module.exports = {generateQRCodeSVG,generateQRCodeString};