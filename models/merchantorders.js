const Merchant = require("./merchants");

class MerchantOrders {
  // path: [merchantId, date in the format YYYYMMDD]
  // orders: List[order]

  static collection(merchantId) {
    return Merchant.doc(merchantId).collection('orders');
  }

  static doc(merchantId, date) {
    return MerchantOrders.collection(merchantId).doc(date);
  }

  static get(merchantId, date) {
    const doc = await MerchantOrders.doc(merchantId, date).get();
    if (!doc.exists) {
      return { orders: [] }
    }
  }

  static save(merchantId, date, merchantOrders) {
    return MerchantOrders.get(merchantId, date).set(merchantOrders);
  }
}

module.exports = MerchantOrders;