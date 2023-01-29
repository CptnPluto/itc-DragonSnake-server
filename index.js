require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const UsersRoute = require("./routes/users_routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/users", UsersRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
