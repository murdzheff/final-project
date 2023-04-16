import React from 'react'
import { useNavigate } from 'react-router-dom'

function DashboardHeader(props) {
  const navigate = useNavigate()

  return (
    <div>
      <h3>{props.user.first_name}</h3>
      <div className='options'>
        <button
          onClick={() => {
            navigate("/onboarding")
          }}
          className='preferences'>
          Preferences
        </button>
        <button
          className='logout'
          onClick={() => {
            localStorage.clear()
            navigate("/home")
          }}>
          Log out
        </button>
      </div>

    </div>
  )
}

export default DashboardHeader