const express = require("express");

const router = express.Router();

const {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
}= require("../controllers/watchlistController");

router.get("/",getWatchlist);

router.post("/add",addToWatchlist);

router.delete("/remove",removeFromWatchlist);

module.exports =
router;