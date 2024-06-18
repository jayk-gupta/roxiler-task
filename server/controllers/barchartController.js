const Product = require("../models/Product");

exports.barChart = async (req, res) => {
  try {
    const month = req.query.month;
    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }, // For prices above 900
    ];

    // Prepare aggregation pipeline to count items in each price range
    const aggregationPipeline = [];
    priceRanges.forEach((range) => {
      aggregationPipeline.push({
        $match: {
          $expr: {
            $and: [
              { $gte: ["$price", range.min] },
              { $lte: ["$price", range.max] },
              {
                $eq: [
                  { $month: "$dateOfSale" },
                  new Date(month).getMonth() + 1,
                ],
              },
            ],
          },
        },
      });
      aggregationPipeline.push({
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      });
    });

    // Execute aggregation pipeline
    const results = await Product.aggregate(aggregationPipeline);

    // Prepare response data
    const responseData = priceRanges.map((range, index) => ({
      range: `${range.min} - ${range.max}`,
      count: results[index]?.count || 0, // If no results, default to 0
    }));

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Server error" });
  }
};
