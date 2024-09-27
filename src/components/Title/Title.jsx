import React from 'react'
import "./Title.css"

export default function Title({children}) {
  return (
    <div>
      <h1 className="title">
        {children}
      </h1>
    </div>
  )
}
