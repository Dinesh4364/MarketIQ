const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const marketRoutes = require("./routes/marketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

const portfolioRoutes = require("./routes/portfolioRoutes");
const watchlistRoutes =require("./routes/watchlistRoutes");
const alertRoutes = require("./routes/alertRoutes");
const indicatorRoutes = require("./routes/indicatorRoutes");
const aiInsightRoutes = require("./routes/aiInsightRoutes");
const chartRoutes = require("./routes/chartRoutes");
const chartIndicatorRoutes = require("./routes/chartIndicatorRoutes");
const fullChartRoutes = require("./routes/fullChartRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/indicators", indicatorRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/ai-insights", aiInsightRoutes);
app.use("/api/chart", chartRoutes);
app.use("/api/chart-indicators", chartIndicatorRoutes);
app.use("/api/full-chart",fullChartRoutes);

module.exports = app;