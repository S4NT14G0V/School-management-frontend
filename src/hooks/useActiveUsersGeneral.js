import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { MESSAGES_ERROR, URLS } from '@config/constants';
import { getActiveUsersGeneral } from '@services/messages'; // Asegúrate de importar el servicio

const useActiveUsersGeneral = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const users = await getActiveUsersGeneral();
        setActiveUsers(users);
      } catch (error) {
        console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
      }
    };

    fetchActiveUsers();

    if (stompClientRef.current) return;

    const socketUrl = `${URLS.SOCKET_URL}`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000, // Intenta reconectar cada 5 segundos
      onConnect: () => {
        client.subscribe('/topic/activeUsers/general', (msg) => {
          if (msg.body) {
            try {
              const users = JSON.parse(msg.body); // Asegúrate de que el mensaje se parsea correctamente
              setActiveUsers(users);
            } catch (error) {
              console.error("Error parsing active users message:", error);
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
  }, []);

  return { activeUsers, setActiveUsers };
};

export default useActiveUsersGeneral;