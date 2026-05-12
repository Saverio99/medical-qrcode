const express = require('express');
const { generateQRCodeSVG } = require('..');
const app = express();
const port = 8080;

app.use(express.json());

// qrcode method is a Promise so we use async/await
app.post('/qrcode', async (req, res) => {
   const qrCode = await generateQRCodeSVG(req.body.text);
   res.status(200).json({ message: `This is your qrcode: ${qrCode}` });
})

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});