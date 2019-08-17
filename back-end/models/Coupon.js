const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CouponSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  deal: {
    type: String,
    required: true
  },
  calculate: {
    type: Number,
    required: true
  },
});
module.exports = Coupon = mongoose.model("coupon", CouponSchema);