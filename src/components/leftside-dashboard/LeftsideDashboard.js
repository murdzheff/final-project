
import MatchesDisplay from './MatchesDisplay'
import { useState } from 'react'
import DashboardHeader from '../dashhboardHeader/DashboardHeader'

const LeftSideContainer = ({ user,toggleModal }) => {
    const [ clickedUser, setClickedUser ] = useState(null)

    return (
        
        
        <div className="left-side-container">
        <DashboardHeader/>

            <div>
                <button className="option" onClick={toggleModal} >Matches</button>
                <button className="option" onClick={toggleModal} >Chat</button>
            </div>

        </div>
        
        
    )
}

export default LeftSideContainer