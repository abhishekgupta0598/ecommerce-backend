const itemsModel = require("../Schema/items");

class itemQuery {
  static async create(item, result) {
    try {
      const items = await itemsModel.create({
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        productCode: item.productCode,
        imagePath: item.imagePath,
        description: item.description,
        userId: item.userId,
      });
      await items.save();
      result(null, items);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findAll(result) {
    try {
      const items = await itemsModel.find();
      result(null, items);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async findById(id, result) {
    try {
      const items = await itemsModel.findById(id);
      result(null, items);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }

  static async deleteById(id, result) {
    try {
      const item = await itemsModel.deleteOne({ _id: id });
      result(null, item);
    } catch (e) {
      console.log("error", e);
      result(e, null);
    }
  }
}

module.exports = itemQuery;
