const express = require ("express");
const app = express();
const socketio = require("socket.io");

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/socket.html");
});

const server = app.listen(3000,() => {
console.log("Server running @localhost:3000");
});

const io = socketio.listen(server);

io.sockets.on("connection",function(socket){
   // console.log("Client Connected!!");
    socket.emit("data_to_client","Hello from server!!");
    socket.on("data_to_server",function(data){
        // socket.emit("data_to_client",data); // broadcast to only current client
        io.sockets.emit("data_to_client",data); // brodcasts to all clients
    });
});