import React, { createContext, use, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

 const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server with id:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        
}, []);



    return (

        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );  
    
}

export default SocketProvider;

    