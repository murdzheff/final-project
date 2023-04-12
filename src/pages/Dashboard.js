import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
import userManager from '../model/userManager'
import Chat from '../components/chat/Chat'

function Dashboard() {
  let userId = JSON.parse(localStorage.getItem("token")).userId
  const [user,setUser] = useState(null)

  useEffect( () => {
    userManager.getUserById(userId).then( (result) => {

    setUser(result)
    })
    
  },[])


  return (
    <div>
      <div className='leftSide-dashboard'>
          
      </div>
      <div>

      </div>
    </div>
  )
}

export default Dashboard