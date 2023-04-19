import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./dashboard-header.scss"

function DashboardHeader(props) {
  const navigate = useNavigate()

  return (
    <div className='dashBoard-header'>
      { props.user.photos && <img className='userPhoto' src={props.user.photos[0] || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}></img>}
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