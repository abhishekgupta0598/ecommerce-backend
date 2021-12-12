const db = require("./firestore");

class UserAudit {
  // log

  static collection(username) {
    return db.collection('user').doc(username).collection('audit');
  }

  static add(username, log) {
    return UserAudit.collection(username).doc(Date.now().toString()).set({ 'log': log });
  }
}

module.exports = UserAudit;