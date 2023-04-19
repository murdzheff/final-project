import React from 'react'
import "./RegisterButton.scss"
function RegisterButton({toggleModal}) {

  return (
    <div className='container'>
      <h1>Отметни надясно</h1>
      <button onClick={toggleModal} className='registerButton'>Създай профил</button>
    </div>
  )
}

export default RegisterButton