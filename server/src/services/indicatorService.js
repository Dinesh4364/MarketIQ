const { RSI, EMA, SMA, MACD, BollingerBands } = require("technicalindicators");

const getMovingAverages = (prices) => {

    const sma20 = SMA.calculate({
        period: 20,
        values: prices
    });

    const ema20 = EMA.calculate({
        period: 20,
        values: prices
    });

    const bollinger = BollingerBands.calculate({
        values: prices,
        period: 20,
        stdDev: 2
    });

    return {
        sma20,
        ema20,
        bollinger
    };

};

const calculateIndicators = (prices) => {

    const rsi = RSI.calculate({
        values: prices,
        period: 14
    });

    const ema = EMA.calculate({
        values: prices,
        period: 20
    });

    const sma = SMA.calculate({
        values: prices,
        period: 20
    });

    const macd = MACD.calculate({
        values: prices,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
    });

    const bollinger = BollingerBands.calculate({
        values: prices,
        period: 20,
        stdDev: 2
    });

    return {
        RSI: rsi,
        EMA20: ema,
        SMA20: sma,
        MACD: macd,
        BollingerBands: bollinger
    };

};

module.exports = {
    calculateIndicators,
    getMovingAverages
};