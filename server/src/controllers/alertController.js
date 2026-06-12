const Alert =
require("../models/Alert");

// GET alerts
const getAlerts =
async (req, res) => {

    try {
        const alerts =
            await Alert.find();
        res.json(alerts);
    }
    catch (error) {
        res.status(500).json({

            message: error.message
        });
    }
};

// CREATE alert
const createAlert =
async (req, res) => {

    try {
        const {
            symbol,
            condition,
            targetPrice
        } = req.body;
        const alert =
            await Alert.create({
                symbol,
                condition,
                targetPrice
            });
        res.status(201).json(alert);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAlerts,
    createAlert
};