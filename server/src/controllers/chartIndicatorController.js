const { getHistoricalPrices } = require("../services/marketService");
const { getMovingAverages } = require("../services/indicatorService");

const getChartIndicators = async (req, res) => {

    try {

        const symbol = req.query.symbol || "BTCUSDT";

        const prices = await getHistoricalPrices(symbol);

        const movingAverages = getMovingAverages(prices);

        res.json(movingAverages);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getChartIndicators
};