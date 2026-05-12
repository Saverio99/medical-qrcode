var QRCode = require('qrcode');

async function generateQRCodeSVG(text){
    try {
        const url =  await QRCode.toDataURL(text);
        console.log(url + "\n");
        return url;   
    } catch (error) {
        console.log("Some error: ", error);
        throw error;
    }
}

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