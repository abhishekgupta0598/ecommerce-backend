const express = require("express");
const User = require("../models/users");
const { asyncHandler } = require("../common/async");
const { BadRequestError } = require("../common/errors");
const jwt = require("jsonwebtoken");
const router = express();

router.use(express.json());

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const userin = req.body;
    const user = await User.findByCredentials(userin.username, userin.password);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    // console.log("express-jwt", req.user);
    return { user, token };
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const exists = await User.userExists(req.body.username);
    if (exists) throw new BadRequestError("User already exists!");
    const body = req.body;
    if (!body.username || !body.email || !body.password || !body.mobile_no) {
      throw new BadRequestError("Not all required info is present!");
    }
    await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    return { msg: "User created!" };
  })
);

module.exports = router;
