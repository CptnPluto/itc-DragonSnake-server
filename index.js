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
const { Socket } = require("dgram");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
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

io.on("connection", (client) => {
    client.on("create room", () => {
        let roomId = Math.random().toString(36).substring(2, 7);
        client.join(roomId);
        console.log("Rooms : ", client.rooms);
        client.emit("roomId", roomId);
    });

    client.on("join room", (roomId) => {
        client.join(roomId);
        io.in(roomId).emit("user joined", client.id);
        client.emit("roomId", roomId);
    });

    client.on("start game", (roomId) => {
        io.to(roomId).emit("game started");
    });

    client.on("send key", (data) => {
        // client.broadcast.emit("received key", data);
        console.log("data : ", data);
        io.in(data.roomId).emit("received key", data.key);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
