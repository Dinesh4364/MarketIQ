const express = require("express");

const router = express.Router();

const {getPortfolio,buyAsset,sellAsset} = require("../controllers/portfolioController");

router.get("/", getPortfolio);

router.post("/buy", buyAsset);

router.post("/sell", sellAsset);

module.exports = router;