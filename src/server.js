const express = require("express");
const { Server }= require("socket.io");

const PORT = process.env.PORT || 8080;
const app = express();

const server = app.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto: ${PORT}`));

app.use(express.static(__dirname + "/public"));

const io = new Server(server);

const messages = [];


io.on("connection", (socket) => {
    console.log("Se ha conectado un nuevo cliente");

    socket.emit("srvMessage", messages);
    socket.on("newMessage", (data) => {
        messages.push(data);
        // enviar a todos los clientes
        io.sockets.emit("srvMessage", messages);
    })
})

