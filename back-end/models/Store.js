const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Partner'
  },
  coupons: [{
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  logo: {
    type: Buffer
  }
});
module.exports = Store = mongoose.model("store", StoreSchema);