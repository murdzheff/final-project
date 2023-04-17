import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./dashboard-header.scss"

function DashboardHeader(props) {
  const navigate = useNavigate()

  return (
    <div className='dashBoard-header'>
      <img className='userPhoto' src={props.user.photos[0]}></img>
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