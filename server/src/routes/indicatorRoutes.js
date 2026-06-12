const express = require("express");

const router = express.Router();

const {getIndicators} = require("../controllers/indicatorController");

router.get("/",getIndicators);

module.exports = router;