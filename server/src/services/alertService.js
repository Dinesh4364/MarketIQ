const Alert = require("../models/Alert");
const { getCryptoPrices } = require("./marketService");

const checkAlerts = async (io) => {

    try {
        const alerts = await Alert.find({
            triggered: false
        });
        if (!alerts.length) {
            return;
        }
        const marketData = await getCryptoPrices();
        for (const alert of alerts) {
            const asset = marketData.find(
                item => item.symbol === alert.symbol
            );
            if (!asset) {
                continue;
            }
            const currentPrice = Number(
                asset.lastPrice
            );
            let triggered = false;
            if (
                alert.condition === ">" &&
                currentPrice >= alert.targetPrice
            ) {
                triggered = true;
            }
            if (
                alert.condition === "<" &&
                currentPrice <= alert.targetPrice
            ) {
                triggered = true;
            }
            if (triggered) {
                alert.triggered = true;
                await alert.save();
                console.log(
                    `ALERT TRIGGERED: ${alert.symbol}`
                );

                io.emit(
                    "alert-triggered",
                    {
                        symbol: alert.symbol,
                        targetPrice: alert.targetPrice,
                        condition: alert.condition,
                        currentPrice
                    }
                );
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    checkAlerts
};