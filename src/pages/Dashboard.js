import { useState } from 'react'
import LeftSideContainer from '../components/leftside-dashboard/LeftsideDashboard'
// import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
// import userManager from '../model/userManager'
import CardsContainer from '../components/cards/CardsContainer'
import Chat from '../components/chat/Chat'
import { Navigate, useNavigate } from "react-router-dom"
import messageManager from '../model/messageManager'



function Dashboard() {




  const [type, setType] = useState("Matches")
  const [matches, setMatches] = useState([])
  const [rec, setRec] = useState(null)
  const [chats,setChats] = useState([])

  async function update(id) {
    await Promise.all([
        messageManager.getMessages(JSON.parse(localStorage.getItem("token")).userId, id),
        messageManager.getMessages(id, JSON.parse(localStorage.getItem("token")).userId)
    ]).then(([messagesTo, messagesFrom]) => {
        const allMsgs = [...messagesTo, ...messagesFrom].sort((a, b) => b.timestamp - a.timestamp);
        
        setChats(allMsgs)
    });
}

  const toggleModal = (e) => {
    
    e.preventDefault();
    if (e.target.textContent === "Matches") {
      setType("Matches")
    } else {
      setType("Chat")
    }
  }

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token).userId : null;

  let navigate = useNavigate()

  if (user === null) {
    
    return null;
  }



  return (
    <div className='dashboard'>
      <LeftSideContainer
        matches={matches}
        setMatches={setMatches}
        toggleModal={toggleModal}
        user={user}
        setRec={setRec}
        setType={setType}
        setChats={update} />
      <CardsContainer matches={matches} setMatches={setMatches} type={type}></CardsContainer>
      {rec !== null ? <Chat loggedUser={user} correspondingUserId={rec} type={type}></Chat> : null}



    </div>

  )

}
export default Dashboard