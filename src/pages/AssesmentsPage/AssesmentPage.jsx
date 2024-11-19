import React from 'react'
import AssesmentList from '@components/Assesment/AssesmentsList'

export default function AssesmentPage({title = "Assesment"}) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="classes-divider" />
      <AssesmentList />
    </>
  )
}
