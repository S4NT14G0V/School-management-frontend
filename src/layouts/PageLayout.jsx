// src/pages/Layouts/PageLayout.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom'; // Utiliza Outlet para rutas hijas
import './PageLayout.css';
import { MESSAGES_ERROR } from '../config/constants';
import { getInfo } from '../services/userService';

export default function PageLayout({children}) {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const user = await getInfo();
      if (user) {
        setUserData(user);
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

  return (
    <div className='page-layout'>
      <Sidebar userData={userData} /> {/* Pasa el userData al Sidebar */}
      <div className="page-container">
        {children}  {/* Renderiza las rutas hijas aquí */}
      </div>
    </div>
  );
}
