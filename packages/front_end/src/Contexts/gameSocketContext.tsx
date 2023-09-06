import { io } from "socket.io-client";
import React from "react";

export const gamesocket = io("/game");
export const gameSocketContext = React.createContext(gamesocket);