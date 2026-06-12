const express = require("express");

const router = express.Router();

const {getChartIndicators} = require("../controllers/chartIndicatorController");

router.get("/", getChartIndicators);

module.exports = router;