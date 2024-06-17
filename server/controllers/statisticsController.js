const Product = require("../models/Product");

exports.statistics = async (req, res) => {
  try {
    const month = req.query.month;
    // Calculate statistics for the input month
    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, new Date(month).getMonth() + 1],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          totalSoldItems: {
            $sum: { $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 } },
          },
          totalNotSoldItems: {
            $sum: {
              $cond: { if: { $eq: ["$sold", false] }, then: 1, else: 0 },
            },
          },
        },
      },
    ]);

    res.json(totalSaleAmount);
  } catch (error) {
    console.error("Error calculating statistics:", error);
    res.status(500).json({ error: "Server error" });
  }
};
