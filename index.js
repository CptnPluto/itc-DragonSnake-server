require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UsersRoute = require("./routes/users_routes");
const ScoresRoute = require("./routes/scores_routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/users", UsersRoute);
app.use("/scores", ScoresRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
