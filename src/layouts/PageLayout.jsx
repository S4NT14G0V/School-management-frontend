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
        let titleColor = "#000";
        let messageColor = "#000";
        let borderColor = '#0058ca'; // Default color
        let backgroundColor = '#ffffff'; // Default background color
        let backgroundUrl = ""; // Default background image
        let textColor = '#000000'; // Default text color
        let duration = 10; // Default duration
        let borderRadius = '5px'; // Default border radius
        let boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Default box shadow
        let fontFamily = 'Arial, sans-serif'; // Default font family
        let animation = 'fadeIn 0.5s'; // Default animation
        let icon = ''; // Default icon
        let title = message.title;
        let messageContent = message.message;
  
        // Extract JSON configuration from the title
        const configMatch = title.match(/%CONFIG:({.*})%/);
        if (configMatch) {
          try {
            const config = JSON.parse(configMatch[1]);
            titleColor = config.titleColor || titleColor;
            messageColor = config.messageColor || messageColor;
            borderColor = config.borderColor || borderColor;
            backgroundColor = config.backgroundColor || backgroundColor;
            backgroundUrl = config.backgroundUrl || backgroundUrl;
            textColor = config.textColor || textColor;
            duration = config.duration || duration;
            borderRadius = config.borderRadius || borderRadius;
            boxShadow = config.boxShadow || boxShadow;
            fontFamily = config.fontFamily || fontFamily;
            animation = config.animation || animation;
            icon = config.icon || icon;
            title = title.replace(/%CONFIG:({.*})%/, '').trim();
          } catch (e) {
            console.error('Invalid JSON configuration in title:', e);
          }
        }
  
        notification.open({
          message: (
            <span style={{ fontWeight: 700, color: titleColor, fontFamily: fontFamily }}>
              {icon && <img src={icon} alt="icon" style={{ marginRight:"10px", maxWidth: "15px", maxHeight:"15px" }} />}
              {title}
            </span>
          ),
          description: <p style={{ color: messageColor, fontFamily: fontFamily }}>{messageContent}</p>,
          duration: duration,
          style: {
            borderLeft: `5px solid ${borderColor}`, // Border color
            backgroundColor: backgroundColor, // Background color
            color: textColor, // Text color
            backgroundImage: `url(${backgroundUrl})`, // Background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: borderRadius, // Border radius
            boxShadow: boxShadow, // Box shadow
            animation: animation, // Animation
          },
        });
      });
      setMessageNotifications([]); // Clear notifications after displaying them
    }
  }, [messageNotifications, setMessageNotifications]);
  
  /*backgroundImage: "url(https://gaming-cdn.com/images/products/9456/orig/league-of-legends-pc-juego-cover.jpg?v=1662363312)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",*/

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
