const express = require("express");
const { generateQRCodeSVG } = require("../qrcode/qrcode");
const router = express.Router();

// qrcode method is a Promise so we use async/await
router.post("/qrcode", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Void body" });
    }

    const qrCode = await generateQRCodeSVG(JSON.stringify(req.body));

    res.setHeader('Content-Type', 'image/svg+xml')
    res.status(200).send(qrCode);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We have encountered an error", error: error });
  }
});

module.exports = router;