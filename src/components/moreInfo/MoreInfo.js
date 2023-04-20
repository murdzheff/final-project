import React from 'react'
import CardsCarousel from '../cards/CardsCarosel'
import "./moreInfo.scss"

function MoreInfo(props) {

  if (props.type !== "info") {
    return null
  }

  return (
    <div className='more-info-container'>
      <div className='card'>
        <CardsCarousel photos={props.user.photos} ></CardsCarousel>
        <h2>{props.user.first_name}</h2>
        <h3>Gender: {props.user.gender_identity}</h3>
        <h4>{2023 - props.user.dob_year} years old</h4>
        {props.user.about?.length > 2 && <p>About: <br /> {props.user.about}</p>}
      </div>
    </div>
  )
}

export default MoreInfo