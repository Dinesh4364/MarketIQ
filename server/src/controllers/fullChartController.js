const { getCandlestickData, getHistoricalPrices } = require("../services/marketService");

const {
    calculateIndicators,
    getMovingAverages
} = require("../services/indicatorService");

const getFullChartData = async (req, res) => {

    try {

        const symbol = req.query.symbol || "BTCUSDT";

        const interval = req.query.interval || "1h";

        const candles = await getCandlestickData(
            symbol,
            interval
        );

        const prices = await getHistoricalPrices(
            symbol,
            interval
        );

        const movingAverages =
            getMovingAverages(prices);

        const indicators =
            calculateIndicators(prices);

        res.json({
            candles,
            movingAverages,
            indicators
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getFullChartData
};