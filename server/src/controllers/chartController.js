const { getCandlestickData } = require("../services/marketService");

const getChartData = async (req, res) => {

    try {

        const symbol = req.query.symbol || "BTCUSDT";

        const interval = req.query.interval || "1h";

        const data = await getCandlestickData(
            symbol,
            interval
        );

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getChartData
};