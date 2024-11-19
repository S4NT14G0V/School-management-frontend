import React from 'react'
import './AcademicInfo.css'
import Logo from '@assets/logo.png'

const AcademicInfo = ({login}) => {
  return (
    <div className={!login ? "academic-info": "login-info"}>
        <img src={Logo} alt="Logo de Hogwarts" />
        {!login ? <h2>Hogwarts Academy</h2> : <h1>Hogwarts Academy</h1>}
    </div>
  )
}

export default React.memo(AcademicInfo);
