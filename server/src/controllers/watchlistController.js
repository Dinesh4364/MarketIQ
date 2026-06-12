const Watchlist = require("../models/Watchlist");
const {getCryptoPrices} = require("../services/marketService");

// GET watchlist
const getWatchlist = async (req, res) => {

    try {
        const watchlist = await Watchlist.findOne();
        if (!watchlist) {
            return res.json([]);
        }
        const marketData = await getCryptoPrices();
        const result = watchlist.symbols.map(
                symbol => {
                    const asset = marketData.find(
                            item =>
                            item.symbol === symbol
                        );
                    return {
                        symbol,
                        price:
                            Number(asset?.lastPrice),
                        change:
                            Number(asset?.priceChangePercent),
                        volume:
                            Number(asset?.volume)
                    };
                }
            );
        res.json(result);
    }
    catch (error) {
        res.status(500).json({
            message:
            error.message
        });
    }
};


// ADD symbol
const addToWatchlist =
async (req, res) => {
    try {
        const {symbol} = req.body;
        let watchlist = await Watchlist.findOne();
        if (!watchlist) {
            watchlist = await Watchlist.create({symbols: []});
        }
        if (!watchlist.symbols.includes(symbol)) {
            watchlist.symbols.push(symbol);
            await watchlist.save();
        }
        res.json(
            watchlist
        );
    }
    catch (error) {
        res.status(500).json({
            message:
            error.message
        });
    }
};

const removeFromWatchlist = async (req, res) => {
    try {
        const { symbol } = req.body;
        const watchlist = await Watchlist.findOne();
        if (!watchlist) {
            return res.status(404).json({
                message: "Watchlist not found"
            });
        }
        watchlist.symbols = watchlist.symbols.filter(
            item => item !== symbol
        );
        await watchlist.save();
        res.json(watchlist);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
};