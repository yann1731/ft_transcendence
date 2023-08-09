import { io } from "socket.io-client";
import React from "react";

export const socket = io("http://localhost:4242/chatsocket");
export const SocketContext = React.createContext(socket);
export const gamesocket = io("http://localhost:4242/game");
export const gameSocketContext = React.createContext(gamesocket);
