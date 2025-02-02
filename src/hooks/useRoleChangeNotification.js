import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MESSAGES_ERROR, URLS } from '@config/constants';

const useRoleChangeNotification = (email) => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (!email) return;

    const socketUrl = `${URLS.SOCKET_URL}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
      onConnect: () => {
        client.subscribe(`/topic/roleChange/${email}`, (msg) => {
          if (msg.body) {
            try {
              const notification = JSON.parse(msg.body); // Asegúrate de que el mensaje se parsea correctamente
              setNotifications((prev) => [...prev, notification]);
              // Recargar la página cuando se recibe una notificación
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            } catch (error) {
              console.error("Error parsing notification message:", error);
            }
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
  }, [email]);

  return { notifications };
};

export default useRoleChangeNotification;