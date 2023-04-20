import { useState } from 'react'
import LeftSideContainer from '../components/leftside-dashboard/LeftsideDashboard'
// import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
// import userManager from '../model/userManager'
import CardsContainer from '../components/cards/CardsContainer'
import Chat from '../components/chat/Chat'
import messageManager from '../model/messageManager'
import MoreInfo from '../components/moreInfo/MoreInfo'
import React from 'react'





function Dashboard(props) {
  const [type, setType] = useState("Matches")
  const [matches, setMatches] = useState([])
  const [rec, setRec] = useState(null)
  const [chats, setChats] = useState([])
  const [infoUser, setInfoUser] = useState(rec)



  function sortByTimestamp(objects) {
    return objects.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }



  async function update(id) {
    await messageManager.getMessages(props.loggedUser.user_id, id).then(mess => {
      let sorted = sortByTimestamp(mess)
      setChats(sorted)
    })
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


      {type === "Matches" && props.loggedUser &&
        <CardsContainer
          update={props.update}
          setUpdate={props.setUpdate}
          matches={matches}
          loggedUser={props.loggedUser}
          setInfoUser={setInfoUser}
          setType={setType}
          setMatches={setMatches}
          type={type}></CardsContainer>}
      {rec !== null && type === "Chat" ?
        <Chat
          loggedUser={props.loggedUser}
          setInfoUser={setInfoUser}
          setType={setType}
          correspondingUserId={rec}
          type={type}></Chat> : null}
      {rec !== null &&
        type === "info" ?
        <MoreInfo
          type={type}
          loggedUser={props.loggedUser} user={infoUser} ></MoreInfo> : null}



    </div>

  )

}
export default Dashboard