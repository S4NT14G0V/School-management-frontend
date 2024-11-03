import React from 'react'
import SubjectAdmin from '../../components/Table/SubjectAdmin'

export default function AdminSubject({ title = "Subject Management" }) {
  return (
    <div className="admin-container">
      <h1>{title}</h1>
      <hr className="admin-divider" />
      <SubjectAdmin />
    </div>
  )
}
