import { io } from "socket.io-client";
import React from "react";

export const socket = io("http://localhost:4242/chatsocket", { autoConnect: false });
export const SocketContext = React.createContext(socket);

