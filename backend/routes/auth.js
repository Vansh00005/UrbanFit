const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Wrong credentials!"); // Send response and end here
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!"); // Send response and end here
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken }); // Send response only once
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
