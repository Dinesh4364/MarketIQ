const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },

    asset: {

        type: String,

        required: true

    },

    quantity: {

        type: Number,

        required: true

    },

    buyPrice: {

        type: Number,

        required: true

    }

},
{
    timestamps: true
});

module.exports =
    mongoose.model(
        "Portfolio",
        portfolioSchema
    );