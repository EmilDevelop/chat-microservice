const io = require("socket.io-client");

const serverAddress = "http://5.53.124.87:3007";
const localAddress = "http://127.0.0.1:3007";
const DEBUG = true;
const connectTo = DEBUG ? localAddress : serverAddress;
console.log(connectTo);
const socket = io(connectTo); // Замените на ваш порт

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("chat", (message) => {
  console.log("Received message:", message);
});

socket.emit("chat", "Hello, server!");
socket.emit("chat", "Second message");
