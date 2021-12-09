const mongoose = require("mongoose");
const db = require("./firestore");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../common/errors");

class User {
  // username
  // email
  // passHash

  static collection() {
    return db.collection("users");
  }

  static doc(username) {
    return User.collection().doc(username);
  }

  static async findByUsername(username) {
    const userDoc = await User.doc(username).get();
    if (!userDoc.exists) {
      throw new BadRequestError("User not found");
    }
    const user = userDoc.data();
    delete user.passHash;
    return user;
  }

  static async userExists(username) {
    return Promise.resolve((await User.doc(username).get()).exists);
  }

  static async findByCredentials(username, password) {
    const userDoc = await User.doc(username).get();
    if (!userDoc.exists) {
      throw new BadRequestError("Invalid credentials!");
    }
    const user = userDoc.data();
    if (!(await bcrypt.compare(password, user.passHash))) {
      throw new BadRequestError("Invalid credentials!");
    }
    delete user.passHash;
    return user;
  }

  static async create(user) {
    const salt = await bcrypt.genSalt();
    user.passHash = await bcrypt.hash(user.password, salt);
    delete user.password;
    return User.doc(user.username).set(user);
  }
}

module.exports = User;
