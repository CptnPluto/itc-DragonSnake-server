require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UsersRoute = require("./routes/users_routes");
const ScoresRoute = require("./routes/scores_routes");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Access to XMLHttpRequest at 'http://localhost:8080/socket.io/?EIO=4&transport=polling&t=OO7je4q' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/users", UsersRoute);
app.use("/scores", ScoresRoute);

const players = [];
io.on("connection", (client) => {
  console.log("connected to socket");

  client.on("join", (socketId) => {
    // socket.join(socketId);
    console.log(socketId);

    client.emit("tick", socketId);
  });

  client.on("click", (data) => {
    console.log(data);
    client.emit("clicked", "second");
  });

  client.on("ready", (snake) => {
    client.to(socketId).emit("tick", "data");
    //check game ending condition
    // check if food
    //generate cells
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
