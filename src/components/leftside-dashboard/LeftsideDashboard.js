

import { useState, useEffect } from 'react'
import DashboardHeader from '../dashhboardHeader/DashboardHeader'
import userManager from '../../model/userManager'
import "./leftSideDashboard.scss"




const LeftSideContainer = (props) => {
    const [matchedUsers, setMatchedUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)



    useEffect(() => {

        setCurrentUser(props.loggedUser)



        if (props.loggedUser.matches) {

            Promise.all(props.loggedUser.matches.map(e => {

                return e = userManager.getUserById(e.user_id)
            }))
                .then(result => {
                    let trueMatches = []
                    result.forEach(e => {
                        if (e.matches && e.matches.find(el => el.user_id === props.loggedUser.user_id)) {
                            trueMatches.push(e)
                            props.setMatches(trueMatches)
                        }
                    })
                    setMatchedUsers(trueMatches)

                })
        }



    }, [props.matches.length])

    return (


        <div className="left-side-container">
            {currentUser !== null ? <DashboardHeader user={currentUser} /> : null}

            <div className='matches-header'>
                <button className="optionMatches" onClick={props.toggleModal} >Matches</button>
            </div>
            <div>
                {matchedUsers.map((el, index) => {

                    return el = <div className='match' key={index}>
                        <label htmlFor={"my-button" + index}>
                            <img className='userPhoto' src={el.photos[0] || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}></img>
                            <p>{el.first_name}</p>
                        </label>
                        <button id={"my-button" + index} value={el.user_id} style={{ display: "none" }} onClick={(e) => {

                            props.setRec(e.target.value)
                            props.setChats(e.target.value)

                            props.setType("Chat")


                        }}></button>
                    </div>
                })}
            </div>
        </div>


    )
}

export default LeftSideContainer