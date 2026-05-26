const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const prisma = require("../store/prismaClient");
const { generateJwt } = require("../jwt/jwtManager");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({
      where: { email: username },
    });
    if (existing)
      return res.status(409).json({ error: "Usermame already registered" });

    const registrationUser = await prisma.user.create({
      data: {
        email: username,
        password: hasedPassword,
      },
    });

    if (!registrationUser) return;
    res.status(200).send("You have registered correctly");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exist
    const user = await prisma.user.findUnique({ where: { email: username } });
    if (!user) {
      res.status(404).json({ error: "User not found, please register." });
      return;
    }
    // check if password received is the same password in DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    } else {
      // generate JWT
      const token = generateJwt(user.id, user.email);
      res.status(200).send("You are logged in!. This is your JWT: " + token);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
