import React from 'react'

function DashboardHeader(user) {
  console.log(user)
  return (
    <div>{user?.user?.first_name}</div>
  )
}

export default DashboardHeader