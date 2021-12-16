const { BadRequestError } = require("../common/errors");
const db = require("./firestore");
const Merchant = require("./merchants");

class Product {
  // merchantId
  // productCode
  // title
  // imagePath
  // description
  // price

  static collection(merchantId) {
    if (merchantId == "main") {
      return db.collection("products");
    }
    return Merchant.doc(merchantId).collection('products');
  }

  static doc(merchantId, productCode) {
    return Product.collection(merchantId).doc(productCode);
  }

  static async listProducts(merchantId, pageNo) {
    const products = [];
    const productDocs = await Product.collection(merchantId).get();
    productDocs.forEach(doc => products.push(doc.data()));
    return products;
  }

  static async getProduct(merchantId, productCode) {
    const doc = await Product.doc(merchantId, productCode).get();
    if (!doc.exists) {
      throw new BadRequestError("Product not found");
    }
    return doc.data();
  }

  async productExists(merchantId, productCode) {
    return (await Product.doc(merchantId, productCode)).exists;
  }

  async addProduct(product) {
    if (Product.productExists(product.merchantId || "main", product.productCode)) {
      throw new BackendError('Product already exists!');
    }
    await Product.doc(product.merchantId, product.productCode).set(product);
  }
}

module.exports = Product;
