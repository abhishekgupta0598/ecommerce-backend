const UserModel = require("../Schema/users");
const bcrypt = require("bcrypt");

class UserQuery {
  static async create(new_user, result) {
    try {
      if (
        new_user.name == null ||
        new_user.password == null ||
        new_user.email == null ||
        new_user.mobile_no == null
      ) {
        result("please provide all the information", null);
        return;
      }
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(new_user.password, salt);
        new_user.password = hashedPassword;
      } catch (e) {
        result(e, null);
        return;
      }
      const user = await UserModel.create({
        name: new_user.name,
        email: new_user.email,
        password: new_user.password,
        mobile_no: new_user.mobile_no,
      });
      await user.save();
      result(null, user);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findAll(result) {
    try {
      const users = await UserModel.find();
      result(null, users);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findById(id, result) {
    try {
      const users = await UserModel.findById(id);
      result(null, users);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async deleteById(id, result) {
    console.log("id", id);
    try {
      const user = await UserModel.deleteOne({ _id: id });
      result(null, user);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }
}

module.exports = UserQuery;
