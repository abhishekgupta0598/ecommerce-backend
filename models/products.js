const mongoose = require("mongoose");
const { BadRequestError } = require("../common/errors");
const db = require("./firestore");
const User = require("./users");

class Product {
  // productCode
  // title
  // imagePath
  // description
  // price

  static collection() {
    return db.collection('products');
  }

  static doc(productCode) {
    return Product.collection().doc(productCode);
  }

  static async listProducts(pageNo) {
    const products = [];
    const productDocs = await Product.collection().get();
    productDocs.forEach(doc => products.push(doc.data()));
    return products;
  }

  static async getProduct(productCode) {
    const doc = await Product.doc(productCode).get();
    if (!doc.exists) {
      throw new BadRequestError('Product not found');
    }
    return doc.data()
  }

  async productExists(productCode) {
    return (await Product.doc(productCode)).exists;
  }

  async addProduct(product) {
    if (Product.productExists(product.productCode)) {
      throw new BackendError('Product already exists!');
    }
    await P.doc(product.productCode).set(product);
  }
}

module.exports = Product
