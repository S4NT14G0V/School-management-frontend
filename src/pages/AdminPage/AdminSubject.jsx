import React from 'react'
import SubjectAdmin from '../../components/Administration/Subjects/SubjectAdmin'

export default function AdminSubject({ title = "Subject Management" }) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="page-divider" />
      <SubjectAdmin />
    </>
  )
}