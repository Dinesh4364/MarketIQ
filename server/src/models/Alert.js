const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: [">", "<"],
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    },
    triggered: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

module.exports =
    mongoose.model(
        "Alert",
        alertSchema
    );