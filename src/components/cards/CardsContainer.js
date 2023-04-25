import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import CardsCarousel from './CardsCarosel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import StarBtn from './star.svg'
import X from './X.svg'
import heart from './heart.svg'
import reload from './reload.svg'
import PhotoWithPulse from '../loader/loader';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import userManager from '../../model/userManager';
import { useLocation } from 'react-router-dom'
import PopUp from '../popup/PopUp';
import SupperPopUp from '../popup/supperLikePopup'
import Confetti from '../confets/confets'
import './styles.css'
import StripeContainer from '../creditCard/stripeContainer';





function CardsContainer(props) {
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();
  const [liked, setLiked] = useState(null)
  const [disliked, setdisLiked] = useState(null)
  const [matchedUser, setmatchedUser] = useState(false)
  const [showPayedBox, setShowPayedBox] = useState(false)
  const [usersSurvived, setUsersSurvived] = useState(0)


  useEffect(() => {


    let a
    const genderInterest = props.loggedUser.gender_interest;
    setProfilePic(props.loggedUser.photos[0] || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg")
    a = props.loggedUser.matches

    userManager.getGenderedUsers(genderInterest)
      .then((response) => {

        const filteredUsers = excludeArrayByUserId(response, props.loggedUser.matches || [])

        setUsers(filteredUsers);
        setUsers(shuffleArray(filteredUsers));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

  }, [location]);


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function excludeArrayByUserId(array1, array2) {
    // Create a Set of user IDs in array2 for faster lookups
    const userIdSet = new Set(array2.map(obj => obj.user_id));

    // Filter array1 based on whether each object's user_id is NOT in the Set, also excluding the loggedUser's account and filtering by age
    const filteredArray = array1.filter(obj => !userIdSet.has(obj.user_id));
    const arrayWithoutMe = filteredArray.filter(obj => obj.user_id !== props.loggedUser.user_id)

    let noPhotos = filterArray(arrayWithoutMe)
    let ageFilter = noPhotos.filter(e => { return 2023 - e.dob_year < props.loggedUser?.age_interest.max && e.dob_year > props.loggedUser?.age_interest.min })
    return ageFilter;
  }



  function filterArray(array) {
    return array.filter(obj => {
      const { photos } = obj;
      if (!photos) return false;
      const filteredPhotos = photos.filter(photo => photo !== null);
      return filteredPhotos.length >= 1 && filteredPhotos.length <= 5;
    });
  }


  const swiped = (direction, user) => {
    setUsersSurvived(usersSurvived + 1)
    setSwipedUsers([...swipedUsers, user.email]);


    if (direction === 'up') {

      userManager.addMatch(props.loggedUser.user_id, user.user_id)
      userManager.addMatch(user.user_id, props.loggedUser.user_id)
      props.setMatches([...props.loggedUser.matches, { user_id: user.user_id }])
      props.loggedUser.matches.push({ user_id: user.user_id })
      setmatchedUser(user);
      setTimeout(() => {
        setmatchedUser(null)
      }, 3000);


    }

    if (direction === 'right') {
      userManager.addMatch(props.loggedUser.user_id, user.user_id)
      props.setMatches([...props.loggedUser.matches, { user_id: user.user_id }])
      props.loggedUser.matches.push({ user_id: user.user_id })
      setLiked(user);
      setTimeout(() => {
        setLiked(null)
      }, 3000);
    } else if (direction === 'left') {
      setdisLiked(user);

      setTimeout(() => {
        setdisLiked(null)
      }, 3000);
    }
  };


  const swipe = (direction) => {
    swipeRef.current.swipe(direction);
  };

  if (props.type !== 'Matches') {
    return null;
  }
  if (isLoading) {
    return <PhotoWithPulse imageSrc={profilePic} />
  }


  if (users.length === swipedUsers.length) {
    return (
      <div className='swipe-container'>

        <div className='card-container-no-users'>
          <p>No more users to swipe! <br></br> Come back tomorrow! </p>
          <Button className='refreshUsers' onClick={() => setSwipedUsers([])}  >
            <img src={reload} />
          </Button>{' '}
        </div>


      </div>
    );
  }


  return (

    <>
      {matchedUser && <Confetti />}
      {showPayedBox && <StripeContainer loggedUser={props.loggedUser} setShowPayedBox={setShowPayedBox} propss={users[users.length - 1 - usersSurvived]} />}


      <div className='swipe-container'>
        <div className='card-container'>
          {users.map((user) => (
            !swipedUsers.includes(user.email) ? (
              <TinderCard
                ref={swipeRef}
                className='swipe'
                key={user._id}
                onSwipe={(dir) => swiped(dir, user)}
              >
                <div className='card'>
                  <CardsCarousel photos={user.photos || ["https://mtclinic.org/wp-content/uploads/2021/09/Photo-Unavailable-300x225.jpg"]} />
                  <div className='user-information'>
                    <div>
                      <h3 className='user-name-cards'>{user.first_name}</h3>
                      <span className='user-years-cards'>{new Date().getFullYear() - user.dob_year}</span>
                    </div>

                    <div>
                      <FontAwesomeIcon icon={faLocationDot} style={{ color: 'white', marginRight: '12px' }} />
                      <p className='information-text'> На {Math.ceil(Math.random() * 200)} километра разстояние </p>
                    </div>

                    <div className='information-important-tnd'>
                      {props.onlineUsers.includes(user.user_id) && <div style={{ display: "flex" }}>
                        <FontAwesomeIcon icon={faCircle} style={{ color: '#7cfda3', marginRight: '12px' }} />
                        <p className='information-text'> Онлайн сега </p>
                      </div>}
                      <button
                        title={`See more about ${user.first_name}`}
                        id='infoIcon'
                        onTouchStart={() => { props.setType("info"); props.setInfoUser(user) }}
                        onClick={() => { props.setType("info"); props.setInfoUser(user) }} >i</button>
                    </div>

                  </div>
                </div>
              </TinderCard>
            ) : null
          ))}
        </div>

        <div className='button-container-tin'>


          <Button title="I don't like this user" className='button-left-tin' onClick={() => swipe('left')} variant="outline-danger">
            <img src={X}></img>
          </Button>{' '}

          <Button title='Superlike this user' className='button-up-tin' onClick={() => props.loggedUser.paymentStatus ? swipe('up') : setShowPayedBox(true)} variant="outline-primary">
            <img src={StarBtn}></img>
          </Button>{' '}

          <Button title='Like this user' className='button-right-tin' onClick={() => swipe('right')} variant="outline-success">
            <img src={heart}></img>

          </Button>{' '}


        </div>


        {liked && <PopUp message={`You liked ${liked.first_name}, if they like you back you will have a match!`} />}
        {disliked && <PopUp message={`You have disliked ${disliked.first_name}, they won't show up for a while...`} />}
        {matchedUser && <SupperPopUp message={`You Super liked ${matchedUser.first_name},now you can chat together!`} />}
      </div>
    </>
  );

}

export default CardsContainer;


