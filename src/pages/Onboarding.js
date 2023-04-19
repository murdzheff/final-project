import React from 'react'
import userManager from '../model/userManager'
import { useState,useEffect } from 'react'
import EditForm from '../components/editForm/editForm'


function Onboarding(props) {


    // const [loggedUser,setLoggedUser] = useState(null)

    // useEffect(() => {
    //     const id = JSON.parse(localStorage.getItem("token")).userId
    //     userManager.getUserById(id)
    //     .then(result => {
    //         setLoggedUser(result)
    //     })
    // }, [])

   console.log(props)


  return (
    <div className='onBoarding-container'>
        <EditForm setLoggedUser={props.setLoggedUser} loggedUser={props.loggedUser} />
    </div>
  )
}

export default Onboarding