const User = require("./users");

const mongoose = require("mongoose");
const db = require('./firestore');

function _getEmptyCart(username) {
  return {items: []}
}

class Cart {
  // items: [{ productCode, quantity, price}]

  static collection(username) {
    return User.doc(username).collection('cart');
  }

  static doc(username) {
    return Cart.collection(username).doc('main');
  }

  static async findByUsername(username) {
    const doc = await Cart.doc(username).get();
    if (doc.exists) return doc.data();
    return _getEmptyCart(username)
  }

  static async clearCart(username) {
    return Cart.doc(username).set(_getEmptyCart(username));
  }

  static async save(username, cart) {
    return await Cart.doc(username).set(cart);
  }
}

module.exports = Cart;
