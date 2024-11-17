// src/pages/Layouts/PageLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './PageLayout.css';

export default function PageLayout() {
  return (
    <div className='page-layout'>
      <Sidebar />
      <div className="page-container">
        <Outlet />  {/* Aquí se renderizan las páginas */}
      </div>
    </div>
  );
}
