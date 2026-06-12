const generateInsight = (symbol, indicators) => {

    const { RSI, EMA20, SMA20, MACD } = indicators;

    let trend = "";
    let risk = "";

    if (RSI > 70) {
        risk = "The asset appears overbought and may experience a short-term correction.";
    } else if (RSI < 30) {
        risk = "The asset appears oversold and could rebound.";
    } else {
        risk = "RSI indicates balanced market conditions.";
    }

    if (MACD.MACD > MACD.signal) {
        trend = "Bullish momentum is currently dominant.";
    } else {
        trend = "Bearish momentum is currently dominant.";
    }

    return {
        symbol,
        summary: `${symbol} is showing active market movement.`,
        trend,
        risk,
        emaVsSma:
            EMA20 > SMA20
                ? "EMA20 is above SMA20, supporting an upward trend."
                : "EMA20 is below SMA20, suggesting weakness."
    };
};

module.exports = {
    generateInsight
};