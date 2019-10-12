//we don't need a store schema, just partner (business) + their deals

/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'Partner'
  },
  coupons: [{type: Schema.Types.ObjectId, ref: 'Coupon'}]

});
module.exports = Store = mongoose.model("store", StoreSchema);*/