import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MESSAGES_ERROR, URLS } from '@config/constants';

const useMessageNotification = (email) => {
  const [notifications, setNotifications] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!email || stompClientRef.current) return;

    const socketUrl = `${URLS.SOCKET_URL}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
      onConnect: () => {
        client.subscribe(`/topic/message/${email}`, (msg) => {
          if (msg.body) {
            try {
              const notification = JSON.parse(msg.body); // Asegúrate de que el mensaje se parsea correctamente
              setNotifications((prev) => [...prev, notification]);
            } catch (error) {
              console.error("Error parsing notification message:", error);
            }
          }
        });
        stompClientRef.current = client; // Guardar cliente sólo si la conexión es exitosa
      },
      onStompError: (error) => {
        console.error(MESSAGES_ERROR.WEBSOCKET_CONNECTION, error);
      }
    });

    client.activate(); // Activa la conexión STOMP

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [email]);

  return { notifications, setNotifications };
};

export default useMessageNotification;