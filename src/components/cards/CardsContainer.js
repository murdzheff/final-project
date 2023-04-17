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
import { faLocationDot,faCircle,faCircleInfo } from '@fortawesome/free-solid-svg-icons';




function CardsContainer(props) {
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [likedUsers, setLikedUsers]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [profilePic, setProfilePic]=useState("");


  

  useEffect(() => {
    let a
    axios
      .get('http://localhost:8080/user', {
        params: { userId: JSON.parse(localStorage.getItem('token')).userId },
      })
      .then((user) => {
        const genderInterest = user.data.gender_interest;
        setProfilePic(user.data.photos[0])
        a=user.data.matches
        setLikedUsers(user.data.matches?user.data.matches:[]);
        
        

        axios
          .get('http://localhost:8080/gendared-users', {
            params: { gender: genderInterest },
          })
          .then((response) => {
            
            const filteredUsers = excludeArrayByUserId(response.data,user.data.matches || [])
            console.log(filteredUsers)
            
            setUsers(filteredUsers);
            setIsLoading(false);

          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);

          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

      });
  }, []);
  
  useEffect(() => {
    let a
    axios
      .get('http://localhost:8080/user', {
        params: { userId: JSON.parse(localStorage.getItem('token')).userId },
      })
      .then((user) => {
        const genderInterest = user.data.gender_interest;
        setProfilePic(user.data.photos[0])
        a=user.data.matches
        setLikedUsers(user.data.matches?user.data.matches:[]);
        
        

        axios
          .get('http://localhost:8080/gendared-users', {
            params: { gender: genderInterest },
          })
          .then((response) => {
            
            const filteredUsers = excludeArrayByUserId(response.data,user.data.matches || [])
            console.log(filteredUsers)
            
            setUsers(filteredUsers);
            setIsLoading(false);

          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);

          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

      });
  }, [props.type]);


  function excludeArrayByUserId(array1, array2) {
    // Create a Set of user IDs in array2 for faster lookups
    const userIdSet = new Set(array2.map(obj => obj.user_id));
    
    // Filter array1 based on whether each object's user_id is NOT in the Set
    const filteredArray = array1.filter(obj => !userIdSet.has(obj.user_id));
    const arrayWithoutMe = filteredArray.filter(obj => obj.user_id !== JSON.parse(localStorage.getItem("token")).userId)
    
    return arrayWithoutMe;
  }
  

  function filterArray(array1, array2) {
    console.log(array1.filter(item1 => !array2.some(item2 => item1.user_id === item2.user_id)))
    return array1.filter(item1 => !array2.some(item2 => item1.user_id === item2.user_id))
  }

  const swiped = (direction, user) => {
        setSwipedUsers([...swipedUsers, user.email]);
        

        if (direction === 'right') {
           axios.put('http://localhost:8080/addmatch', {
           userId: JSON.parse(localStorage.getItem('token')).userId,
           matchedUserId: user.user_id,

           })
            .then((response) => {
             setLikedUsers(response.data);
             if (user.matches.find(e => e.user_id === JSON.parse(localStorage.getItem("token")).userId))
              props.setMatches((matches) => [...matches,user])
             })
            .catch((error) => {
             console.log(error);
            });
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
  if(isLoading){
    return <PhotoWithPulse imageSrc={profilePic}/>
  }
  if (users.length === swipedUsers.length) {
    return (
      <div className='swipe-container'>
        <div className='card-container'>
          <p>No more users to swipe!</p>
        </div>
        <div className='button-container-tin'>
          <Button className='button-left-tin' onClick={() => setSwipedUsers([])}  >
              <img src={reload}/>
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
                <CardsCarousel  photos={user.photos || ["https://mtclinic.org/wp-content/uploads/2021/09/Photo-Unavailable-300x225.jpg"]} />
                <div className='user-information'>
                  <div>
                       <h3 className='user-name-cards'>{user.first_name}</h3>
                       <span className='user-years-cards'>{new Date().getFullYear() - user.dob_year}</span>
                  </div>

                  <div>
                  <FontAwesomeIcon icon={faLocationDot}style={{ color: 'white',marginRight: '12px'  }} /> 
                  <p className='information-text'> На 3 километра разстояние </p>            
                  </div>

                  <div className='information-important-tnd'>
                    <div style={{display:"flex"}}>
                    <FontAwesomeIcon icon={faCircle}style={{ color: '#7cfda3',marginRight: '12px'  }} /> 
                    <p className='information-text'> Онлайн сега </p>
                    </div> 
                    <FontAwesomeIcon onClick={() => {console.log(user)}} icon={faCircleInfo} style={{fontSize:"30px" , color:"#d7d7d8"}} />       
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


