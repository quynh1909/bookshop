const express = require("express");
const cors = require("cors");
const bookRouter = require("./app/routers/book.route");
const publisherRouter = require("./app/routers/publisher.route");
const authRouter = require("./app/routers/auth.route");

const ApiError = require("./app/api-error");
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define routes
app.use("/api/books", bookRouter);
app.use("/api/publishers", publisherRouter);
app.use("/api/auths", authRouter);

// Default route
app.get("/", (req, res) => {
   res.json({ message: "Welcome to bookshop application." });
});

// Handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


// Define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;
