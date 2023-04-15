
import MatchesDisplay from './MatchesDisplay'
import { useState , useEffect } from 'react'
import DashboardHeader from '../dashhboardHeader/DashboardHeader'
import userManager from '../../model/userManager'


const LeftSideContainer = ({ user,toggleModal,matches,setMatches }) => {
    const [ clickedUser, setClickedUser ] = useState(null)
    useEffect(()=>{
        userManager.getUserById(JSON.parse(localStorage.getItem('token')).userId).then(res=>{
        userManager.getUsersByIds(res.matches.map(e=>e=e.user_id)).then(result=>{
            return result.filter(e=>{
                return e.matches?.find(e=>e!==JSON.parse(localStorage.getItem('token')).userId)
              })

            
        })
        })
    })

    return (
        
        
        <div className="left-side-container">
        <DashboardHeader/>

            <div>
                <button className="option" onClick={toggleModal} >Matches</button>
                <button className="option" onClick={toggleModal} >Chat</button>
            </div>
            <div>
                
            </div>
        </div>
        
        
    )
}

export default LeftSideContainer