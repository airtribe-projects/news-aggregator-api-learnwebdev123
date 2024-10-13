require('dotenv').config();
const express = require('express');
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {}).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
    console.log(`Logger : ${req.method} Request received on ${req.url}`);
    next();
  };
  
app.use(logger)

app.use("/api/v1", userRouter);

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Error while connecting to server', err);
    }
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;
