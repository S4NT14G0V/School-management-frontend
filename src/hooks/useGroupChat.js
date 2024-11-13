import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMessagesByClass } from '../services/messages';

const useGroupChat = (classId) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesOld = await getMessagesByClass(classId);
        setMessages(messagesOld);
      } catch (error) {
        console.error("Error fetching messages: " + error.message);
      }
    };

    if (classId) {
      fetchMessages();
    }
  }, [classId]);

  useEffect(() => {
    console.log("Connecting to WebSocket...");
    const socketUrl = 'https://backend-hogwarts.onrender.com/ws';

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
      onConnect: () => {
        console.log("Connected to WebSocket");

        client.subscribe('/topic/group', (msg) => {
            console.log("Mensaje recibido en el cliente:", msg.body); // Verificación de recepción
            if (msg.body) {
              setMessages((prev) => [...prev, JSON.parse(msg.body)]);
            }
          });
          

        setStompClient(client); // Guardar cliente sólo si la conexión es exitosa
      },
      onStompError: (error) => {
        console.error("Error in WebSocket connection: ", error);
      }
    });

    client.activate(); // Activa la conexión STOMP

    return () => {
      if (client) client.deactivate(() => console.log("Disconnected from WebSocket"));
    };
  }, [classId]);

  const sendMessage = (message) => {
    if (stompClient && stompClient.connected && message.content.trim() !== '') {
      console.log("Sending message:", message);
      stompClient.publish({
        destination: '/app/send',
        body: JSON.stringify(message),
      });
    } else {
      console.log("STOMP client not connected or message empty");
    }
  };

  return { messages, sendMessage };
};

export default useGroupChat;
