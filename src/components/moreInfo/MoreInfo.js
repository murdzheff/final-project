import React, { useEffect, useState } from 'react'
import CardsCarousel from '../cards/CardsCarosel'
import "./moreInfo.scss"
import userManager from '../../model/userManager'
import { useNavigate } from 'react-router-dom'

function MoreInfo(props) {
    const [loggedUser, setLoggedUser] = useState(null)
    const [foundInMatches, setFoundInMatches] = useState(false)

    // useEffect(() => {
    //   userManager.getUserById(props.loggedUser)
    //   .then(res => {
    //     setLoggedUser(res)
    //     console.log(loggedUser.matches)
    //     if (loggedUser.matches.find(e => e.user_id === props.user.user_id)) {
    //       setFoundInMatches(true)
    //     }

    //   })
    // },[props.user])
    
   

    if (props.type !== "info") {
        return null
    }

    function removeMatch () {
      let index = loggedUser.matches.findIndex(obj => obj.user_id === props.user.user_id)

      const newMatches = loggedUser.matches;
      newMatches.splice(index,1)

      userManager.updateUser(JSON.stringify({

        formData: {
            user_id: loggedUser.userId,
            first_name: loggedUser.first_name,
            dob_day: loggedUser.dob_day,
            dob_month: loggedUser.dob_month,
            dob_year: loggedUser.dob_year,
            show_gender: loggedUser.show_gender,
            gender_identity: loggedUser.gender_identity,
            gender_interest: loggedUser.gender_identity,
            photos: loggedUser.photos,
            about: loggedUser.about,
            matches: newMatches
        }
    }))
    }


  return (
    <div className='more-info-container'>
        <div className='card'>
            <CardsCarousel photos={props.user.photos} ></CardsCarousel>
            <h2>{props.user.first_name}</h2>
            <h3>Gender: {props.user.gender_identity}</h3>
            <h4>{2023 - props.user.dob_year} years old</h4>
            {props.user.about.length > 2 && <h3>About: <br/> {props.user.about}</h3>}
            {/* {foundInMatches ? <button className='unmatch' onClick={removeMatch}>Unmatch</button> : null} */}
        </div>
    </div>
  )
}

export default MoreInfo