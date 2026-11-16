import express from "express";
import cors from "cors";
import { createServer } from "http"; //create a http server
import { Server } from "socket.io";

const app = express(); //creating an express (node server)
app.use(cors()); //telling our server to allow cross-origin requests

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); //creating our socket connection

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("draw", (line) => {
    socket.broadcast.emit("draw", line); //broadcast event for when I draw on our canvas
  });

  // broadcast when someone joins server
  io.emit("users", io.engine.clientsCount); // someone joined

  socket.on("getUsers", () => {
    socket.emit("users", io.engine.clientsCount);
  });

  socket.on("disconnect", () => {
    io.emit("users", io.engine.clientsCount); // someone left
  });

  // inside io.on("connection"), same as draw
  socket.on("stamp", (stamp) => {
    socket.broadcast.emit("stamp", stamp);
  });

  //clear/erase function for when someone clicks a clear button
  socket.on("clear", () => {
    io.emit("clear");
  });
});

//tell our server to listen to our localhost:3000
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
