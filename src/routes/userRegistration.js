const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../store/prismaClient");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10); // non è meglio usare un salt randomico?
    if (!hasedPassword) throw error;
    const registrationUser = await prisma.User.create({
      data: {
        email: username,
        password: hasedPassword,
      },
    });

    if (!registrationUser) return;
    res.status(200).send("You have registered correctly");
  } catch (error) {
    res.status(200).send("You encountered an error: " + error);
  }
});

module.exports = router;
