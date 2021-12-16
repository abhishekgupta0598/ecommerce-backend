const User = require("./users");

function _getEmptyCart() {
  return { items: [] }
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
    return _getEmptyCart()
  }

  static async clearCart(username) {
    return Cart.doc(username).set(_getEmptyCart());
  }

  static async save(username, cart) {
    return await Cart.doc(username).set(cart);
  }
}

module.exports = Cart;
