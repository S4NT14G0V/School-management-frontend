import React from 'react'
import './AcademicInfo.css'

export default function AcademicInfo({login}) {
  return (
    <div className={!login ? "academic-info": "login-info"}>
        <img src={!login ? "src/assets/logo.png" : "src/assets/logo.png"} alt="Logo de Hogwarts" />
        {!login ? <h2>Hogwarts Academy</h2> : <h1>Hogwarts Academy</h1>}
    </div>
  )
}
