import React from 'react'
import './AcademicInfo.css'

export default function AcademicInfo({login}) {
  return (
    <div className={!login ? "academic-info": "login-info"}>
        <img src="src/assets/logo.png" alt="Logo de Hogwarts" />
        {!login ? <h2>HOGWARTS ACADEMY</h2> : <h1>HOGWARTS ACADEMY</h1>}
    </div>
  )
}
