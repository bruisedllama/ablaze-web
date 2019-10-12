const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PartnerSchema = new Schema({
  storeName: {
    type: String,
    required: true
  },
  storeAddress: {
    type: String,
    required: true
  },
  storeEmail: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  storeType: {
    type: String,
    required: true
  },
  managerName: {
    type: String,
    required: true
  },
  managerEmail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  coupons: [{type: Schema.Types.ObjectId, ref: 'Coupon'}]
});
module.exports = Partner = mongoose.model("partner", PartnerSchema);