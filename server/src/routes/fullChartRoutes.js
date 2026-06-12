const express = require("express");

const router = express.Router();

const {
    getFullChartData
} = require("../controllers/fullChartController");

router.get(
    "/",
    getFullChartData
);

module.exports = router;