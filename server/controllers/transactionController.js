const Product = require("../models/Product");

exports.transactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const targetMonth = monthNames.indexOf(month) + 1;
    if (isNaN(targetMonth) || targetMonth < 1 || targetMonth > 12) {
      return res.status(400).json({ error: "Invalid month provided." });
    }

    // search query
    const searchQuery = {};
    if (search) {
      const searchRegex = new RegExp(search, "i"); // case-insensitive search
      searchQuery.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { price: parseFloat(search) }, // Assuming search by price is also allowed
      ];
    }

    // Query products instead of transactions
    const products = await Product.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, targetMonth],
      },
      ...searchQuery,
    })
      .sort({ dateOfSale: -1 })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage, 10));

    const totalCount = await Product.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, targetMonth],
      },
      ...searchQuery,
    });

    res.json({
      totalCount,
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10),
      transactions: products,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
};
