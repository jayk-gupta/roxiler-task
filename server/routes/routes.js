const express = require("express");
const router = express.Router();
const { seedData } = require("../controllers/seedDataController");
const { statistics } = require("../controllers/statisticsController");
const { transactions } = require("../controllers/transactionController");
const { getAllSeededData } = require("../controllers/getDataController");

// Routes for transaction-related APIs
router.get("/initialize", seedData);
router.get("/getData", getAllSeededData);
router.get("/transactions", transactions);
router.get("/statistics", statistics);

module.exports = router;
