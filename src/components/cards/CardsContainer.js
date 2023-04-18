import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import CardsCarousel from './CardsCarosel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import StarBtn from './star.svg'
import X from './X.svg'
import heart from './heart.svg'
import arrow from './arrow.svg'
import reload from './reload.svg'
import PhotoWithPulse from '../loader/loader';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import userManager from '../../model/userManager';




function CardsContainer(props) {
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [profilePic, setProfilePic] = useState("");




  useEffect(() => {
    let a
    const genderInterest = props.loggedUser.gender_interest;
    setProfilePic(props.loggedUser.photos[0])
    a = props.loggedUser.matches
    setLikedUsers(props.loggedUser.matches || [])

    // axios
    // .get('http://localhost:8080/gendared-users', {
    //     params: { gender: genderInterest },
    //   })
    //   .then((response) => {

    //     const filteredUsers = excludeArrayByUserId(response.data, props.loggedUser.matches || [])


    //     setUsers(filteredUsers);
    //     setUsers(shuffleArray(filteredUsers));
    //     setIsLoading(false);


    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });

    console.log(props.loggedUser.user_id)
    userManager.getGenderedUsers(genderInterest)
      .then((response) => {
        console.log(response)
        const filteredUsers = excludeArrayByUserId(response, props.loggedUser.matches || [])

        setUsers(filteredUsers);
        setUsers(shuffleArray(filteredUsers));
        setIsLoading(false);


      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });


  }, []);

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

    // Filter array1 based on whether each object's user_id is NOT in the Set
    const filteredArray = array1.filter(obj => !userIdSet.has(obj.user_id));
    const arrayWithoutMe = filteredArray.filter(obj => obj.user_id !== JSON.parse(localStorage.getItem("token")).userId)
    const alreadyLiked = filterObjectsByExclusion(arrayWithoutMe,props.loggedUser.matches)
    console.log(alreadyLiked)
    console.log(props.loggedUser.matches)
    return arrayWithoutMe;
  }

  function filterObjectsByExclusion(originalArray, exclusionArray) {
    // Use the filter method to return a new array of objects from originalArray
    // that are not included in exclusionArray
    return originalArray.filter(obj => !exclusionArray.find(object=>object.user_id===obj.user_id));
  }
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  
  const debouncedAddMatch = debounce(userManager.addMatch, 500);
  

  const swiped = (direction, user) => {
    setSwipedUsers([...swipedUsers, user.email]);


    if (direction === 'right') {
     
   if(props.loggedUser.matches.find(e=>e.user_id===user.user_id)){
    debouncedAddMatch(props.loggedUser.user_id, user.user_id)
    //userManager.addMatch(props.loggedUser.user_id, user.user_id)
   }else{
    alert("you already liked this one")
   }
    }
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
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
        <div className='card-container'>
          <p>No more users to swipe!</p>
        </div>
        <div className='button-container-tin'>
          <Button className='button-left-tin' onClick={() => setSwipedUsers([])}  >
            <img src={reload} />
          </Button>{' '}
          <Button disabled>X</Button>
          <Button disabled>Y</Button>
          <Button disabled>Z</Button>
          <Button disabled>D</Button>

        </div>
      </div>
    );
  }
  return (
    <div className='swipe-container'>
      <div className='card-container'>
        {users.map((user) => (
          !swipedUsers.includes(user.email) ? (
            <TinderCard
              ref={swipeRef}
              className='swipe'
              key={user._id}
              onSwipe={(dir) => swiped(dir, user)}
              onCardLeftScreen={() => outOfFrame(user.first_name)}
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
                    <p className='information-text'> На 3 километра разстояние </p>
                  </div>

                  <div className='information-important-tnd'>
                    <div style={{ display: "flex" }}>
                      <FontAwesomeIcon icon={faCircle} style={{ color: '#7cfda3', marginRight: '12px' }} />
                      <p className='information-text'> Онлайн сега </p>
                    </div>
                    <FontAwesomeIcon className='infoIcon' onClick={() => { props.setType("info"); console.log(user); props.setInfoUser(user) }} icon={faCircleInfo} style={{ fontSize: "30px", color: "#d7d7d8" }} />
                  </div>

                </div>
              </div>
            </TinderCard>
          ) : null
        ))}
      </div>

      <div className='button-container-tin'>
        <Button className='button-left-tin' onClick={() => swipe('left')} variant="outline-warning">
          <img src={reload}></img>
        </Button>{' '}

        <Button className='button-left-tin' onClick={() => swipe('left')} variant="outline-danger">
          <img src={X}></img>
        </Button>{' '}

        <Button className='button-up-tin' onClick={() => swipe('up')} variant="outline-primary">
          <img src={StarBtn}></img>
        </Button>{' '}

        <Button className='button-right-tin' onClick={() => swipe('right')} variant="outline-success">
          <img src={heart}></img>

        </Button>{' '}

        <Button className='button-right-tin' onClick={() => swipe('right')} variant="outline-info">
          <img src={arrow}></img>
        </Button>{' '}

      </div>

    </div>
  );

}

export default CardsContainer;


