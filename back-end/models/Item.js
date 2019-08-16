const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
// This schema can be used for both the menu and after an item is ordered
const ItemSchema = new Schema({
  name: { // item name
    type: String,
    required: true
  },
  description: { // item description
    type: String,
    required: true
  },
  custom: { // any customization by the customer
    type: String
  },
  price: {
    type: Double,
    required: true
  },
  image: { // image of the item
    type: Buffer
  }
});
module.exports = Item = mongoose.model("item", ItemSchema);
