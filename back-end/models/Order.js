const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const OrderSchema = new Schema({
  customer: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  items: [{ // items in the order
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  time: {
    type: Date,
    default: Date.now
  },
  status: { // Status of order: Ordered, Preparing, Completed or similar
    type: String,
    required: true,
    default: 'Ordered'
  }
});
module.exports = Order = mongoose.model("order", OrderSchema);
