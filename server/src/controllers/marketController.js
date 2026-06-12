const {
    getCryptoPrices
} = require("../services/marketService");

const getMarketData = async (req, res) => {

    try {

        const data = await getCryptoPrices();

        res.json(data);

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getMarketData
};