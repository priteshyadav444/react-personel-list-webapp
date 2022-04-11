const express = require("express");
const User = require("../modal/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

// api > /users/
//desc > register  user with hash password return on success token and userdetails
//access > public
router.post("/", (req, res) => {
  const { username, email, password } = req.body.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "enter all required field" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exist" });

    const newUser = new User({
      username,
      email,
      password,
    });
    //create salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: 1455555 },
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
  });
});

module.exports = router;
