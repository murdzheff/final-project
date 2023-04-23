import React from 'react'
import EditForm from '../components/editForm/editForm'


function Onboarding(props) {
  return (
    <div className='onBoarding-container'>

        <EditForm setLoggedUser={props.setLoggedUser} loggedUser={props.loggedUser} />
    </div>
  )
}

export default Onboarding