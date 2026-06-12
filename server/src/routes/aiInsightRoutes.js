const express = require("express");
const router = express.Router();

const { getAIInsight } = require("../controllers/aiInsightController");

router.get("/", getAIInsight);

module.exports = router;