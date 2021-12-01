const cartModel = require("../Schema/cart");

class cartQuery {
  static async create(cart, result) {
    try {
      const carts = await cartModel.create({
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
        userId: cart.userId,
        itemId: cart.itemId,
      });
      await carts.save();
      result(null, carts);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findAll(result) {
    try {
      const carts = await cartModel
        .find()
        .populate("itemId")
        .populate("userId");
      result(null, carts);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findById(id, result) {
    try {
      const cart = await cartModel
        .findById(id)
        .populate("itemId")
        .populate("userId");
      result(null, cart);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async deleteById(id, result) {
    try {
      const cart = await cartModel.deleteOne({ _id: id });
      result(null, cart);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async update(cartId, id, result) {
    try {
      const cart = await cartModel.findById(cartId);
      const item = cart.itemId.includes(id);
      if (item == true) {
        const index = cart.itemId.indexOf(id);
        cart.itemId.splice(index, 1);
        cart.save();
      }
      console.log("item", item);
      console.log("cart", cart);
      result(null, cart);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findByUser(id, result) {
    try {
      const cart = await cartModel.findByUserId(id);
      result(null, cart);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }
}

module.exports = cartQuery;
