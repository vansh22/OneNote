const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./backend/config.env" });

const mongoURI = process.env.URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

module.exports = connectToMongo;
