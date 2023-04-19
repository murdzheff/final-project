import { useState } from 'react'
import LeftSideContainer from '../components/leftside-dashboard/LeftsideDashboard'
// import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
// import userManager from '../model/userManager'
import CardsContainer from '../components/cards/CardsContainer'
import Chat from '../components/chat/Chat'
import { Navigate, useNavigate } from "react-router-dom"
import messageManager from '../model/messageManager'
import MoreInfo from '../components/moreInfo/MoreInfo'
import { Nav } from 'react-bootstrap'
import userManager from '../model/userManager'




function Dashboard(props) {



  const navigate = useNavigate()
  const [type, setType] = useState("Matches")
  const [matches, setMatches] = useState([])
  const [rec, setRec] = useState(null)
  const [chats,setChats] = useState([])
  const [infoUser,setInfoUser] = useState(rec)
  const [refresh,setRefresh] = useState(false);

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

  userManager.getUsersByIds(props.loggedUser.matches).then(res => {
    console.log(res)
  })

  if (user === null) {
    
    return null
  }



  return (
    <div className='dashboard'>
      {props.loggedUser?.photos && <LeftSideContainer
        type={type}
        matches={matches}
        setMatches={setMatches}
        toggleModal={toggleModal}
        loggedUser={props.loggedUser}
        setRec={setRec}
        setType={setType}
        setChats={update} />}
        
      
      {type === "Matches" && props.loggedUser && <CardsContainer update={props.update} setUpdate={props.setUpdate} matches={matches} loggedUser={props.loggedUser} setInfoUser={setInfoUser} setType={setType} setMatches={setMatches} type={type}></CardsContainer>}
      {rec !== null && type === "Chat" ? <Chat loggedUser={props.loggedUser} setInfoUser={setInfoUser} setType={setType} correspondingUserId={rec} type={type}></Chat> : null}
      {rec !== null && type === "info" ? <MoreInfo type={type} loggedUser={props.loggedUser} user={infoUser} ></MoreInfo> : null}
      


    </div>

  )

}
export default Dashboard