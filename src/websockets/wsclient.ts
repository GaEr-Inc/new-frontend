import { io, Socket } from "socket.io-client";

export const client = io('localhost:4000');

