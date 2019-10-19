const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DealSchema = new Schema({
  item: { // eg. 1 chicken fried rice, 1 drawing lesson, 1 pack of strings, etc. 
    type: String,
    required: true
  },
  origPrice: { // eg. 6.99, 5.50, 10, 200, etc.
    type: Number,
    required: true
  },
  deal: { //eg. 20% off, BOGO, B2GO, etc.
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  },
  issuer: { //email of issue
    type: String,
    required: true
  },
  active: { //whether issuer determines deal is active
    type: Boolean,
    default: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  savedUsers: { //list of users (user emails) who have saved this deal
    type: Array,
    default: []
  },
  usedUsers: { //list of users (user emails) who have used this deal
    type: Array,
    default: []
  },
}, { collection : 'deals' });
module.exports = Deal = mongoose.model("deal", DealSchema);