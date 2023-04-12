import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
import userManager from '../model/userManager'

function Dashboard() {
  const userId = JSON.parse(localStorage.getItem("token").userId || null)
  const [user,setUser] = useState(null)

  useEffect( () => {
    const loggedUser = userManager.getUserById(userId).then(result => {
      
      setUser(result)
    }) 
    
  },[])


  return (
    <div>
      <div className='leftSide-dashboard'>
          <DashboardHeader user={user}/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Dashboard