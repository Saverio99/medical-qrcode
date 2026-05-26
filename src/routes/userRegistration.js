const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../store/prismaClient");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    
    const existing = await prisma.user.findUnique({ where: { email: username } });
    if (existing) return res.status(409).json({ error: "Email already registered" });
    
    const registrationUser = await prisma.user.create({
      data: {
        email: username,
        password: hasedPassword,
      },
    });

    if (!registrationUser) return;
    res.status(200).send("You have registered correctly");
  } catch (error) {
    res.status(500).send( {error: error.message} );
  }
});

module.exports = router;
