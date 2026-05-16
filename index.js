require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const providerRoutes = require("./providerRoutes");

const app = express();

// parse incoming JSON
app.use(express.json());

connectDB();

app.use("/providers", providerRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
