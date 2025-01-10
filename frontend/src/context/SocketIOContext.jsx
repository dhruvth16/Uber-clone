// SocketIOContext.jsx
import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";

export const SocketIOContext = createContext();

export const SocketProvider = ({ children }) => {
  const newSocket = io(import.meta.env.VITE_BASE_URL, {
    withCredentials: true, // Allow cookies if needed
    transports: ["websocket", "polling"], // Ensure all transports are allowed
  });

  useEffect(() => {
    // Initialize socket connection
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }, [newSocket]);

  const sendMessage = (event, message) => {
    if (newSocket) {
      newSocket.emit(event, message);
    }
  };

  const receiveMessage = (event, callback) => {
    if (newSocket) {
      newSocket.on(event, callback);
    }
  };

  return (
    <SocketIOContext.Provider
      value={{ sendMessage, receiveMessage, newSocket }}
    >
      {children}
    </SocketIOContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
