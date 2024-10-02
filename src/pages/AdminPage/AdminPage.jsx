import React from 'react'
import Table from '../../components/Table/Table'
import './AdminPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function AdminPage({title='Administrar Usuarios'}) {
  return (
    <div className='admin-page'>
        <Sidebar/>
        <div className="admin-container">
            <h1>{title}</h1>
            <hr className="admin-divider" />
            <Table/>
        </div>
    </div>
  )
}
