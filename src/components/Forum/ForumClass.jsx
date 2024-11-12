import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // URL de tu servidor de WebSocket

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Escuchar nuevos mensajes desde el servidor
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = (content) => {
        const message = { content, send_date: new Date().toISOString() };
        socket.emit('sendMessage', message);
    };

    return (
        <div>
            <MessageList messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
};

export default ChatRoom;
