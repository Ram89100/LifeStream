const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3177;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.HOSTED_CLIENT_URL,
    credentials: true
}));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT);
        console.log("✅ Connected successfully to database");
    } catch (e) {
        console.error("❌ Error connecting to database:", e);
        process.exit(1); // Exit the process on failure
    }
};

connectDB();

// Default Route (Fix for "Cannot GET /")
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// Routes
app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));
app.use("/bank", require("./routers/bankRouter"));
app.use("/camps", require("./routers/campRouter"));

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
