import { io } from "socket.io-client";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { useEffect, useRef, useState } from 'react';
const useSocket = () => {
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize the socket connection
    console.log("ngrok")
    socket.current = io(BACKEND_URL, {
      transports: ["websocket"]
    });

    // Handle connection
    socket.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    // Handle disconnection
    socket.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    // Handle reconnection attempts
    socket.current.on('reconnect_attempt', () => {
      console.log('Reconnecting...');
    });

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // Function to handle incoming messages
  const subscribeToEvent = (eventName, callback) => {
    if (socket.current) {
      socket.current.on(eventName, callback);
    }
  };

  // Function to emit events/messages
  const emitEvent = (eventName, data) => {
    if (socket.current && isConnected) {
      socket.current.emit(eventName, data);
    }
  };

  return { isConnected, subscribeToEvent, emitEvent, };
};

export default useSocket;
