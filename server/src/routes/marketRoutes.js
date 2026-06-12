const express = require("express");

const {
    getMarketData
} = require("../controllers/marketController");

const router = express.Router();

router.get("/", getMarketData);

module.exports = router;