const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../modals/user");
const userRouter = express.Router();
const auth = require("../middleware/auth");

userRouter.post("/user/signup", async (req, res) => {
  const user = User(req.body);

  if (
    req.body.type.toLowerCase() != "admin" &&
    req.body.type.toLowerCase() != "customer" &&
    req.body.type.toLowerCase() != "delivery"
  ) {
    return res.json({ success: false, msg: "invalid user type" });
  }
  user
    .save()
    .then(async () => {
      token = await user.genenrateTokens();
      res.json({ success: true, user: user });
    })
    .catch((e) => {
      //   console.log(e.errors);

      if (e.code === 11000) {
        res.status(400).json({
          success: false,
          msg: "user already exist with this phone number:" + e.keyValue.phone,
        });
      } else if (e.errors.phone) {
        e.errors.phone.properties.message =
          "invalid phone number, phone number should be 10 character long";
        res.status(400).json({
          success: false,
          msg: e.errors.phone.properties,
        });
      } else if (e.errors.password) {
        e.errors.password.properties.message =
          "password should be of minimum 8 characters";
        res.status(400).json({
          success: false,
          msg: e.errors.password.properties,
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "something went wrong",
        });
      }
    });
});

userRouter.post("/user/login", async (req, res) => {
  console.log(req.body);
  if (req.body.phone.length != 10) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a valid phone number" });
  }

  User.findOne({ phone: req.body.phone })
    .then(async function (user) {
      if (!user) {
        return res.status(404).json({ success: false, msg: "user not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(async function (value) {
          if (!value) {
            return res.json({ success: false, msg: "Incorrect Password" });
          }
          token = await user.genenrateTokens();
          res.json({ success: true, user: user });
        });
    })
    .catch((e) => {
      res
        .status(500)
        .json({ success: false, msg: "something went wrong", error: e });
    });
});

userRouter.post("/user/auth", auth, async (req, res) => {
  res.json({ success: true,user:req.user });
});
module.exports = userRouter;
