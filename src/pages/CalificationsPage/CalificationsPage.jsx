import React from 'react'
import CalificationsTemplate from '@components/Califications/CalificationsTemplate'

export default function CalificationsPage({title = "Califications"}) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="classes-divider" />
      <CalificationsTemplate />
    </>
  )
}
