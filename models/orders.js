const db = require("./firestore");
const { DoesNotExistError } = require("../common/errors");

class Order {
  // id
  // username
  // merchantId
  // items: [Product]
  // status: one of the below enums
  // payments: [{
  //   amount, payment method, comment
  // }]

  static STATUS_PENDING_PAYMENT = 'PENDING_PAYMENT';
  static STATUS_CANCELLED = 'CANCELLED';
  static STATUS_CREATED = 'CREATED';
  static STATUS_COMPLETED = 'COMPLETED';

  static collection() {
    return db.collection('orders');
  }

  static document(id) {
    return Order.collection().doc(id);
  }

  static async orderExists(id) {
    return (await Order.document(id).get()).exists;
  }

  static async get(id) {
    const doc = Order.document(id).get();
    if (!doc.exists) {
      throw new DoesNotExistError();
    }
    return doc.data();
  }

  static async save(order) {
    return Order.document(order.id).set(order);
  }
}

module.exports = Order;