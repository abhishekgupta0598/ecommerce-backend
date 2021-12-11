const db = require("./firestore");

class UserStats {
  // balance

  static collection() {
    return db.collection('userstats');
  }

  static doc(username) {
    return User.collection().doc(username);
  }

  static async get(username) {
    const userDoc = await User.doc(username).get();
    if (!userDoc.exists) {
      return {balance: 0};
    }
    return userDoc.data();
  }

  static save(username, stats) {
    return UserStats.get(username).set(stats);
  }
}

module.exports = UserStats;