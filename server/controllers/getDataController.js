const Product = require("../models/Product");

exports.getAllSeededData = async (req, res) => {
  try {
    // Fetch all seeded data (assuming Product model is used for seeding)
    const seededData = await Product.find();

    res.json(seededData);
  } catch (error) {
    console.error("Error fetching seeded data:", error);
    res.status(500).json({ error: "Server error" });
  }
};
