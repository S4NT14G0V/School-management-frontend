import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Conexión al WebSocket en el backend
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/public', (msg) => {
                const newMessage = JSON.parse(msg.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });

        setStompClient(stompClient);

        return () => stompClient.disconnect();
    }, []);

    const sendMessage = () => {
        if (stompClient && message.trim() !== '') {
            const chatMessage = {
                sender: "User1", // Asigna un usuario
                content: message,
            };
            stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default ChatRoom;
