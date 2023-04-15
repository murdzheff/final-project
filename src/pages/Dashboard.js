import { useState } from 'react'
import LeftSideContainer from '../components/leftside-dashboard/LeftsideDashboard'
// import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
// import userManager from '../model/userManager'
import CardsContainer from '../components/cards/CardsContainer'
import Chat from '../components/chat/Chat'




function Dashboard() {
  
  const [type,setType] = useState("Matches")
  const [matches, setMatches] = useState([])


  const toggleModal = (e) => {
    console.log("hey")
    e.preventDefault();
    if (e.target.textContent === "Matches") {
      setType("Matches")
    } else {
      setType("Chat")
    }
  }
  


  const user = JSON.parse(localStorage.getItem("token").userId || null)
  return (
    <div className='dashboard'>
      <LeftSideContainer toggleModal={toggleModal} user={user} />
      <CardsContainer matches={matches} setMatches={setMatches} type={type}></CardsContainer>
      <Chat loggedUser={user} correspondingUserId={"16f8aea0-d979-11ed-aa9c-d76e0cbebf79"} type={type}></Chat>


    </div>

  )

}
export default Dashboard