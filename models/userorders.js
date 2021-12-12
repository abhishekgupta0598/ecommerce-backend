const db = require("./firestore")
const User = require("./users")

class UserOrders {
  // path: [username, month in the format YYYYMM]
  // orders: List[order]

  static collection(username) {
    return User.doc(username).collection('orders');
  }

  static doc(username, month) {
    return UserOrders.collection(username).doc(month);
  }

  static async get(username, month) {
    const doc = await UserOrders.doc(username, month).get();
    if (!doc.exists) {
      return { orders: [] }
    }
  }

  static async save(username, month, userOrders) {
    return UserOrders.doc(username, month).set(userOrders);
  }
}

module.exports = UserOrders;