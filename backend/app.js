const express = require("express");
const cors = require("cors");

// Import routes
const applianceRoutes = require("./routes/applianceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

// Allow Vue frontend to communicate with backend
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175"
        ],
        credentials: true
    })
);

// Allow JSON data
app.use(express.json());

// Allow form data
app.use(express.urlencoded({ extended: true }));

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "Camtish Catering API is running successfully!"
    });
});

// ===============================
// API ROUTES
// ===============================

app.use("/api/appliances", applianceRoutes);
app.use("/api/bookings", bookingRoutes);

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        message: "Something went wrong on the server.",
        error: err.message
    });
});

// ===============================
// EXPORT APP
// ===============================

module.exports = app;