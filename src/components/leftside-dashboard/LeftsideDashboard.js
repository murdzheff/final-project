
import MatchesDisplay from './MatchesDisplay'
import { useState, useEffect } from 'react'
import DashboardHeader from '../dashhboardHeader/DashboardHeader'
import userManager from '../../model/userManager'
import "./leftSideDashboard.scss"
import messageManager from '../../model/messageManager'



const LeftSideContainer = ({ toggleModal, setChats, setMatches, setRec, setType }) => {
    const [matchedUsers, setMatchedUsers] = useState([])
    const [currentUser,setCurrentUser] = useState(null)


    useEffect(() => {
        userManager.getUserById(JSON.parse(localStorage.getItem('token')).userId).then(res => {
            
            setCurrentUser(res);
            if(res.matches){
                Promise.all(res.matches.map(e => {

                    return e = userManager.getUserById(e.user_id)
                })).then(result => {
    
                    let trueMatches = []
                    result.forEach(e => {
                        if (e.matches && e.matches.find(el => el.user_id === res.user_id)) {
                            trueMatches.push(e)
                            setMatches(trueMatches)
                        }
                    })
                    setMatchedUsers(trueMatches)
                })
            }
        })
    }, [])

    return (


        <div className="left-side-container">
            {currentUser !== null ? <DashboardHeader user={currentUser} /> : null}

            <div className='matches-header'>
                <button className="option" onClick={toggleModal} >Matches</button>
            </div>
            <div>
                {matchedUsers.map((el,index) => {

                    return el = <div className='match' key={index}>
                            <label htmlFor={"my-button" + index}>
                                <img className='userPhoto' src={el.photos[0]}></img>
                                <p>{el.first_name}</p>
                            </label>
                            <button id={"my-button" + index} value={el.user_id} style={{ display: "none" }} onClick={(e) => {
                                
                                setRec(e.target.value)
                                setChats(e.target.value)
                                
                                setType("Chat")


                            }}></button>
                        </div>
                })}
            </div>
        </div>


    )
}

export default LeftSideContainer