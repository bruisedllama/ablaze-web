const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PartnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  phone: {
      type: Number,
      require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  },
  coupons: [{type: Schema.Types.ObjectId, ref: 'Coupon'}]
});
module.exports = Partner = mongoose.model("partner", PartnerSchema);