
import MatchesDisplay from './MatchesDisplay'
import { useState } from 'react'
import DashboardHeader from '../dashhboardHeader/DashboardHeader'

const LeftSideContainer = ({ user }) => {
    const [ clickedUser, setClickedUser ] = useState(null)

    return (
        
        
        <div className="left-side-container">
        <DashboardHeader/>

            <div>
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {/* {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>} */}

            {/* {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>} */}
        </div>
        
        
    )
}

export default LeftSideContainer