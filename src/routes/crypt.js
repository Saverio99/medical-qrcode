const express = require("express");
const { encrypt } = require("../crypt/cryptography");
const {
  storeEncryptedMessage,
  getEncryptedMessage,
} = require("../store/store");
const { generateQRCodeSVG } = require("..");
const app = express();
const port = 8080;

app.use(express.json());

app.post("/encrypt", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Void body" });
    }

    const encryptedMessage = encrypt(JSON.stringify(req.body));
    const id = storeEncryptedMessage(encryptedMessage);
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

app.get("/decrypt/:id", (req, res) => {
  try {
    const decryptedMessage = getEncryptedMessage(req.params.id);
    const json = JSON.parse(decryptedMessage);

    res.status(200).json({ result: json });
  } catch (error) {
    res
      .status(500)
      .json({ message: "We have encountered an error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
