import React from 'react'
import GroupsAdmin from '../../components/Administration/Groups/GroupsAdmin'

export default function AdminGroups({ title = "Groups Management" }) {
  return (
    <div className="admin-container">
      <h1>{title}</h1>
      <hr className="admin-divider" />
      <GroupsAdmin />
    </div>
  )
}
