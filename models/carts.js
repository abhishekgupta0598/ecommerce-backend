const User = require("./users");

const mongoose = require("mongoose");
const db = require('./firestore');

class Cart {
  // username
  // items: [{ productCode, quantity, price}]
  // totalPrice

  static collection(username) {
    return User.doc(username).collection('cart');
  }

  static doc(username) {
    return Cart.collection(username).doc('main');
  }

  static async findByUsername(username) {
    const doc = await Cart.doc(username).get();
    if (doc.exists) return doc.data();
    return {username, items: []}
  }

  static async save(username, cart) {
    return await Cart.doc(username).set(cart);
  }
}

module.exports = Cart;
