const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({

    symbols: [

        {

            type: String

        }

    ]

},
{
    timestamps: true
});

module.exports =
    mongoose.model(
        "Watchlist",
        watchlistSchema
    );