const express = require("express");
const router = express.Router();
const { seedData } = require("../controllers/seedDataController");
const { statistics } = require("../controllers/statisticsController");
const { transactions } = require("../controllers/transactionController");
const { getAllSeededData } = require("../controllers/getDataController");
const { barChart } = require("../controllers/barchartController");
const { pieChart } = require("../controllers/piechartController");

// Routes for transaction-related APIs
router.get("/initialize", seedData);
router.get("/getData", getAllSeededData);
router.get("/transactions", transactions);
router.get("/statistics", statistics);
router.get("/barchart", barChart);
router.get("/piechart", pieChart);

module.exports = router;
