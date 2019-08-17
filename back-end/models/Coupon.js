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
  dealType: { // Percentage (ex 5% off) or Monetary (ex $5 off)
    type: String,
    required: true
  },
  calculation: {
    type: Number,
    required: true
  },
  dollarRequirement: { // a dollar amount requirement for deal to work
    type: Number
  },
  itemRequirement: { // an item number requirement for deal to work
    type: Number
  },
  uses: { // number of uses by all customers. should work like this: 0 means unlimited
    type: Number
  },
  perCustomerUses: { // number of uses by one customer. should work like this: 0 means unlimited
    type: Number
  },
  perOrderUses: { // number of uses per order. should be by default applied to the highest discount item
    type: Number,
    default: 1
  },
  items: [{ // items the coupon applies to. should work like this: if none, deal applies to all items in store
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});
module.exports = Coupon = mongoose.model("coupon", CouponSchema);