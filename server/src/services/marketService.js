const axios = require("axios");

const getCryptoPrices = async () => {
    try {
        const response = await axios.get(
            "https://api.binance.com/api/v3/ticker/24hr"
        );
        // Major coins to display
        const symbols = [
            "BTCUSDT",
            "ETHUSDT",
            "BNBUSDT",
            "SOLUSDT",
            "XRPUSDT",
            "ADAUSDT",
            "DOGEUSDT",
            "AVAXUSDT"
        ];
        const filteredData = response.data
            .filter(
                asset => symbols.includes(
                    asset.symbol
                )
            )
            .map(
                asset => ({
                    symbol: asset.symbol,
                    price: Number(
                        asset.lastPrice
                    ),
                    change: Number(
                        asset.priceChangePercent
                    ),
                    volume: Number(
                        asset.volume
                    ),
                    lastPrice: asset.lastPrice
                })
            );
        return filteredData;
    }
    catch (error) {
        throw new Error(
            error.message
        );
    }
};

const getAssetBySymbol = async (symbol) => {
    const marketData =
        await getCryptoPrices();
    return marketData.find(
        asset => asset.symbol === symbol
    );
};

const getHistoricalPrices = async (symbol = "BTCUSDT", interval = "1h", limit = 100) => {
    try {
        const response = await axios.get(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
            {
                timeout: 10000
            }
        );

        return response.data.map(candle => Number(candle[4]));
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCandlestickData = async (
    symbol = "BTCUSDT",
    interval = "1h",
    limit = 100
) => {

    const response = await axios.get(

        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`

    );

    return response.data.map(candle => ({
        time: candle[0] / 1000,
        open: Number(candle[1]),
        high: Number(candle[2]),
        low: Number(candle[3]),
        close: Number(candle[4])
    }));

};

module.exports = {
    getCryptoPrices,
    getAssetBySymbol,
    getHistoricalPrices,
    getCandlestickData
};