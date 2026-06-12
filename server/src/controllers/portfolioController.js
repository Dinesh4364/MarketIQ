const Portfolio = require("../models/Portfolio");
const { getCryptoPrices } = require("../services/marketService");

const getPortfolio = async (req, res) => {

    try {

        const holdings = await Portfolio.find();

        const marketData = await getCryptoPrices();

        console.log(marketData);

        const portfolio = holdings.map((holding) => {

            const assetData = marketData.find(

                asset => asset.symbol === holding.asset

            );

            const currentPrice = Number(assetData?.lastPrice) || 0;

            const investment = holding.quantity * holding.buyPrice;

            const currentValue = holding.quantity * currentPrice;

            const profitLoss = currentValue - investment;

            return {

                ...holding.toObject(),

                currentPrice,

                investment,

                currentValue,

                profitLoss

            };

        });

        res.json(portfolio);

    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const buyAsset = async (req, res) => {

    try {

        const {

            asset,
            quantity,
            buyPrice

        } = req.body;

        const holding = await Portfolio.create({

            asset,
            quantity,
            buyPrice

        });

        res.status(201).json(holding);

    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const sellAsset = async (req, res) => {

    try {

        const {

            asset,
            quantity

        } = req.body;

        const holding = await Portfolio.findOne({

            asset

        });

        if (!holding) {

            return res.status(404).json({

                message: "Asset not found"

            });

        }

        // Cannot sell more than owned
        if (quantity > holding.quantity) {

            return res.status(400).json({

                message: "Insufficient quantity"

            });

        }

        holding.quantity -= quantity;

        // Remove document if quantity becomes zero
        if (holding.quantity === 0) {

            await Portfolio.findByIdAndDelete(

                holding._id

            );

            return res.json({

                message: "Asset sold completely"

            });

        }

        await holding.save();

        res.json(holding);

    }
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getPortfolio,
    buyAsset,
    sellAsset
};