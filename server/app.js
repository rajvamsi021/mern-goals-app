require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);
require("./models/goalsSchema");

app.use(require("./routes/authRoutes"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
