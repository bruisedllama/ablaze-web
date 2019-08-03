const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PartnerSchema = new Schema({
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
      require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stores: [{type: Schema.Types.ObjectId, ref: 'Store'}]
});
module.exports = Partner = mongoose.model("partner", PartnerSchema);