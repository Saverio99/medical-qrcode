const express = require("express");
const { encrypt, decrypt } = require("../crypt/cryptography");
const {
  storeEncryptedMessage,
  getEncryptedMessage,
} = require("../store/store");
const { generateQRCodeSVG } = require("../qrcode/qrcode");
const router = express.Router();
const { authenticateToken, decodeJwt } = require("../jwt/jwtManager");

router.post("/encrypt", authenticateToken,  async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Void body" });
    }
    
    const userId = req.user.userId;
    const encryptedMessage = encrypt(JSON.stringify(req.body));
    const id = await storeEncryptedMessage(userId, encryptedMessage);
    const qrCode = await generateQRCodeSVG(id);

    res
      .status(200)
      .json({
        result:
          "We are encrypted your message in the following QRCode: " + qrCode,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "We have encountered an error", error: error.message });
  }
});

router.get("/decrypt/:id", async (req, res) => {
  try {
    const encryptedData = await getEncryptedMessage(req.params.id);
    if (!encryptedData) return res.status(404).json({ error: "Id not found" });

    const decryptedData = decrypt(encryptedData);
    const json = JSON.parse(decryptedData);

    res.status(200).json({ result: json });
  } catch (error) {
    res
      .status(500)
      .json({ message: "We have encountered an error", error: error.message });
  }
});

module.exports = router;