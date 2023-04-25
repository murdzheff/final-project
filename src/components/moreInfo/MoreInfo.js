import React from 'react'
import "./moreInfo.scss"

function MoreInfo(props) {

  if (props.type !== "info") {
    return null
  }

  return (
    <div className='more-info-container'>
      <div className='card-info'>
        <div>
          <img src={props.user.photos[0]}></img>
        </div>
        <h2>{props.user.first_name}</h2>
        <h4>Gender: {props.user.gender_identity}</h4>
        <h4>{2023 - props.user.dob_year} years old</h4>
        {props.user.about?.length > 2 && <p>About: <br /> {props.user.about}</p>}
      </div>
    </div>
  )
}

export default MoreInfo