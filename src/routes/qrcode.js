const express = require("express");
const { generateQRCodeSVG } = require("..");
const app = express();
const port = 8090;

app.use(express.json());

// qrcode method is a Promise so we use async/await
app.post("/qrcode", async (req, res) => {
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

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
