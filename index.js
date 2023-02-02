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
    origin: ["https://dragonsnake-client.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dragonsnake-client.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/users", UsersRoute);
app.use("/scores", ScoresRoute);

const game = require("./mp_game_logic/game_setup");
const run = require("./mp_game_logic/game");

io.on("connection", (client) => {
  client.on("create room", () => {
    let roomId = Math.random().toString(36).substring(2, 7);
    client.playerNum = 1;
    client.join(roomId);
    client.emit("roomId", { roomId, playerNum: 1 });
  });

  client.on("join room", (roomId) => {
    client.playerNum = 2;
    client.join(roomId);
    io.in(roomId).emit("user joined", client.id);
    client.emit("roomId", { roomId, playerNum: 2 });
  });

  client.on("ready", (roomId) => {
    io.to(roomId).emit("enter game");
  });

  client.on("start game", (roomId) => {
    io.in(roomId).emit("game started", game.cells);
    run(game, io, roomId, client);
  });

  client.on("send key", (data) => {
    io.in(data.roomId).emit("received key", data.key);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
