import React from 'react'
import AttendanceTable from '@components/Attendance/AttendancePersonal.jsx'

export default function AttendancesPage({title = "Attendances"}) {
  return (
    <>
      <h1>{title}</h1>
      <hr className="classes-divider" />
      <AttendanceTable/>
    </>
  )
}
