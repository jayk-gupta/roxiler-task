const Product = require("../models/Product");
const axios = require("axios")

exports.seedData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;
    await Product.deleteMany({});
    await Product.insertMany(products);
    res.status(200).send("Database initialized with seed data");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error initializing database");
  }
};
