const { calculateIndicators } = require("../services/indicatorService");
const { getHistoricalPrices } = require("../services/marketService");
const { generateInsight } = require("../services/aiInsightService");

const getAIInsight = async (req, res) => {
    try {

        const symbol = req.query.symbol || "BTCUSDT";

        const prices = await getHistoricalPrices(symbol);

        const indicators = calculateIndicators(prices);

        const insight = generateInsight(symbol, indicators);

        res.json({
            symbol,
            indicators,
            insight
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getAIInsight
};