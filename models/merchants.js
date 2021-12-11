const db = require('./firestore');

class Merchant {
  // id
  // name

  static collection() {
    return db.collection('merchants');
  }

  static doc(id) {
    return Merchant.collection().doc(id);
  }

  static async merchantExists(merchantId) {
    return (await Merchant.doc(merchantId).get()).exists;
  }

  static async create(merchant) {
    return Merchant.doc(merchant.id).set(merchant);
  }
}

module.exports = Merchant;
