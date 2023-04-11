import React from 'react'
import "./RegisterButton.scss"
function RegisterButton({toggleModal}) {

  return (
    <div className='container'>
      <h1>Swipe right...</h1>
      <button onClick={toggleModal} className='registerButton'>Register</button>
    </div>
  )
}

export default RegisterButton