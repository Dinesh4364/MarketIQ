const {
    getCryptoPrices,
    getCandlestickData
} = require("../services/marketService");

const marketSocket = (io) => {
    setInterval(async () => {
        try {
            const prices = await getCryptoPrices();
            io.emit("price-update", prices);
            const candles = await getCandlestickData(
                "BTCUSDT",
                "1h"
            );
            io.emit(
                "candle-update",
                candles
            );
        }
        catch (error) {
            console.log("Binance Error:", error.code);
            console.log(error.message);
        }
    }, 15000);
};
module.exports = marketSocket;