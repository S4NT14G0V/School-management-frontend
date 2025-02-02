import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Sidebar from '@components/Sidebar/Sidebar';
import useRoleChangeNotification from '@hooks/useRoleChangeNotification';
import useMessageNotification from '@hooks/useMessageNotification';
import { getInfo } from '@services/userService';
import { MESSAGES_ERROR } from '@config/constants';

import './PageLayout.css';
import PropTypes from 'prop-types';

const PageLayout = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const { notifications } = useRoleChangeNotification(userEmail);
  const { notifications: messageNotifications, setNotifications: setMessageNotifications } = useMessageNotification(userEmail);

  const fetchUserData = async () => {
    try {
      const user = await getInfo();
      if (user) {
        setUserData(user);
        setUserEmail(user.email); // Asigna el correo del usuario
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.error(MESSAGES_ERROR.STANDARD_ERROR_FETCHING, error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      notifications.forEach(notificationItem => {
        notification.open({
          message: <span style={{fontWeight: 700}}>{notificationItem.title}</span>,
          description: notificationItem.message,
          style: {
            backgroundColor: '#f0f0f0', // Color de fondo
            borderLeft: '5px solid rgb(202, 121, 0)', // Borde
            color: '#000', // Color del texto
          }
        });
      });
    }
  }, [notifications]);

  useEffect(() => {
    if (messageNotifications && messageNotifications.length > 0) {
      messageNotifications.forEach(message => {
        notification.open({
          message: <span style={{fontWeight: 700}}>{message.title}</span>,
          description: message.message,
          duration: 10,
          style: {
            backgroundColor: '#f0f0f0', // Color de fondo
            borderLeft: '5px solid #0058ca', // Borde
            color: '#000', // Color del texto
          },
        });
      });
      setMessageNotifications([]); // Limpiar las notificaciones después de mostrarlas
    }
  }, [messageNotifications, setMessageNotifications]);

  return (
    <div className='page-layout'>
      <Sidebar userData={userData} /> {/* Pasa el userData al Sidebar */}
      <div className="page-container">
        {children}  {/* Renderiza las rutas hijas aquí */}
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
