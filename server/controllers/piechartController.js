const Product = require("../models/Product");

exports.pieChart = async (req, res) => {
  try {
    const { month } = req.query;

    // Aggregate pipeline to calculate pie chart data
    const pieChartData = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, new Date(month).getMonth() + 1],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = pieChartData.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ error: "Server error" });
  }
};
