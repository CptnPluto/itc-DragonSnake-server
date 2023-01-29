require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
