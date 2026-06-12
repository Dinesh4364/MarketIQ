import axios from "axios";

export const fetchMarketData = async () => {

    const response = await axios.get(
        "http://localhost:5000/api/market"
    );

    const coins = [
        "BTCUSDT",
        "ETHUSDT",
        "BNBUSDT",
        "SOLUSDT",
        "XRPUSDT",
        "DOGEUSDT"
    ];

    const filtered = response.data.filter(asset =>
        coins.includes(asset.symbol)
    );

    return filtered.map(asset => ({
        symbol: asset.symbol,
        price: Number(asset.lastPrice),
        change: Number(asset.priceChangePercent),
        volume: Number(asset.volume)
    }));

};

