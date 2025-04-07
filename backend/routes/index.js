var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var userModel = require("../models/userModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });

  if (emailCon) {
    res.json({ success: false, message: "Email already exists" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, function (err, hash) {
        let use = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });

        res.json({ success: true, message: "User created successfully" });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (user) {
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        res.json({ success: true, message: "User logged in successfully" });
      } else {
        res.json({ success: false, message: "Invalid email or password" });
      }
    });
  } else {
    res.json({ success: false, message: "User not found" });
  }
});

module.exports = router;
