import { io, Socket } from "socket.io-client";

export const client = io('http://localhost:4000');

