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
    type: String,
    required: false
  },
  storeType: {
    type: String,
    required: true
  },
  storeDetails: {
    type: String,
    required: false
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
  storeDescription: {
    type: String,
    required: false
  }
}, { collection : 'partners' });
module.exports = Partner = mongoose.model("partner", PartnerSchema);