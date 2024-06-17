const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming productId refers to the _id of a Product
    ref: "Product", // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
