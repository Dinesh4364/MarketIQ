require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");
const marketSocket = require("./sockets/marketSocket");

connectDB();

const server = http.createServer(app);
const { checkAlerts } = require("./services/alertService");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

marketSocket(io);

setInterval(() => {
    checkAlerts(io);
}, 10000);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});