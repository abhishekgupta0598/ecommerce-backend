const productModel = require("../Schema/products");

class productQuery {
  static async create(product, result) {
    try {
      const products = await productModel.create({
        price: product.price,
        title: product.title,
        imagePath: product.imagePath,
        description: product.description,
        manufaturedBy: product.manufaturedBy,
        productCode: product.productCode,
        page_no: product.page_no,
      });
      console.log("product", products);
      await products.save();
      result(null, products);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }
  static async findAll(result) {
    try {
      const products = await productModel.find();
      result(null, products);
    } catch (e) {
      console.log("error", e.message);
      result(e.message, null);
    }
  }
}

module.exports = productQuery;
