// client/src/socket.js
import { io } from "socket.io-client";

const URL = process.env.VITE_BN_APP_API_BASE_URL;
const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});
export default socket;