import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMessagesByClass } from '@services/messages';
import { MESSAGES_ERROR, URLS } from '@config/constants';

const useGroupChat = (classId) => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesOld = await getMessagesByClass(classId);
        setMessages(messagesOld);
      } catch (error) {
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      }
    };

    if (classId) {
      fetchMessages();
    }
  }, [classId]);

  useEffect(() => {
    const socketUrl = `${URLS.SOCKET_URL}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
      onConnect: () => {
        client.subscribe(`/topic/class/${classId}`, (msg) => {
            if (msg.body) {
              setMessages((prev) => [...prev, JSON.parse(msg.body)]);
            }
          });
        setStompClient(client); // Guardar cliente sólo si la conexión es exitosa
      },
      onStompError: (error) => {
        console.error(MESSAGES_ERROR.WEBSOCKET_CONNECTION, error);
      }
    });

    client.activate(); // Activa la conexión STOMP

    return () => {
      if (client) client.deactivate();
    };
  }, [classId]);

  const sendMessage = (message) => {
    if (stompClient && stompClient.connected && message.content.trim() !== '') {
      stompClient.publish({
        destination: `/app/send/${classId}`,
        body: JSON.stringify(message),
      });
    } else {
      console.log(MESSAGES_ERROR.WEBSOCKET_CONNECTION);
    }
  };

  return { messages, sendMessage };
};

export default useGroupChat;
