const db = require("./firestore");

class UserAudit {
  // log

  static collection(username) {
    return db.collection('user').doc(username).collection('audit');
  }

  static add(username, log) {
    return UserStats.collection(username).doc(Date.now()).set(log);
  }
}

module.exports = UserAudit;