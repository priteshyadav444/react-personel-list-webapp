const express = require("express");
const User = require("../modal/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// api > /auth/
//desc > login check return  user data require  token auth middle ware
//access > public

router.post("/", (req, res) => {
  const { email, password } = req.body.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "enter all required field" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does't  exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid Caradentials" });

      jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user._id,
              username: user.username,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// api > /auth/user
//desc > get user data
//access > protected

router.get("/user", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
module.exports = router;
