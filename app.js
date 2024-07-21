const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("sendLocation", (data) => {
        io.emit("receiveLocation", { id: socket.id, ...data });
    });
    socket.on("userDisconnect", () => {
        io.emit("userDisconnect", { id: socket.id });
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
