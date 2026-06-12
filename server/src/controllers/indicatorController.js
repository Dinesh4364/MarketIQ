const { calculateIndicators } = require("../services/indicatorService");
const { getHistoricalPrices } = require("../services/marketService");

const getIndicators = async (req, res) => {
    try {
        const symbol = req.query.symbol || "BTCUSDT";

        const prices = await getHistoricalPrices(symbol);

        const indicators = calculateIndicators(prices);

        res.json({
            symbol,
            indicators
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getIndicators
};