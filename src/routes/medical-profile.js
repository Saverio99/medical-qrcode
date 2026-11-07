const express = require("express");
const prisma = require("../store/prismaClient");
const router = express.Router();
const { authenticateToken } = require('../jwt/jwtManager')
const { generateQRCodeSVG } = require("../qrcode/qrcode");

router.get("/getUserProfile", authenticateToken,  async (req, res) => {
  try {

    const medicalProfile = await prisma.medicalProfile.findUnique({
      where: { userId: req.user.userId },
    });
    if(medicalProfile){
      const qrCode = await generateQRCodeSVG(process.env.CLIENT_URL + "emergency/" + medicalProfile.id);
      res.send({medicalProfile: medicalProfile, qrCode: qrCode});  
    }
    else {
      res.status(404).send("");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "We have encountered an error", error: error });
  }
});

module.exports = router;