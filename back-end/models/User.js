const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  orders: [{ // store past orders
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  favoriteStores: [{
    type: Schema.Types.ObjectId,
    ref: 'Store'
  }],
  favoriteItems: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});
module.exports = User = mongoose.model("users", UserSchema);