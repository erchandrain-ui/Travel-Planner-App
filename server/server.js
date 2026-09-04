import "dotenv/config";

import http from "http";

import app from "./src/app.js";

import { Server } from "socket.io";

import connectDB from "./src/config/db.js";

import tripSocket from "./src/sockets/tripSocket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

tripSocket(io);

connectDB()
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch(error => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

server.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});