import { io } from "socket.io-client";
import React from "react";

export const socket = io("/chatsocket", { autoConnect: false });
export const SocketContext = React.createContext(socket);

