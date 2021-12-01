require("dotenv").config();
const express = require("express");
const login = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./Schema/users");
login.use(express.json());

class Login {
  static async login(user, result) {
    const users = await UserModel.find();
    const flag = users.filter((res) => {
      return res.name == user.name;
    });
    console.log("flag", users);
    console.log("flag", flag[0]);
    if (flag[0] == undefined) {
      result("Invalid username and password");
      return;
    }
    if (flag[0].email == user.email) {
      try {
        if (await bcrypt.compare(user.password, flag[0].password)) {
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          //   res.status(200).json({ user: user, token: token });
          result(null, { user: user, token: token });
        } else {
          result("Invalid username or password", null);
        }
      } catch {
        result("Internal server error", null);
      }
    } else {
      result("Invalid username or password", null);
    }
  }
}

module.exports = Login;
