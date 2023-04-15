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
import PhotoWithPulse from '../loader/loader'


function CardsContainer(props) {
  const [users, setUsers] = useState([]);
  const swipeRef = useRef(null);
  const [swipedUsers, setSwipedUsers] = useState([]);
  const [likedUsers, setLikedUsers]=useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/user', {
        params: { userId: JSON.parse(localStorage.getItem('token')).userId },
      })
      .then((response) => {
        const genderInterest = response.data.gender_interest;
        setLikedUsers(response.data.matches)
        
        axios
          .get('http://localhost:8080/gendared-users', {
            params: { gender: genderInterest },
          })
          .then((response) => {
            // filter out any users whose ID is in the likedUsers array
            const filteredUsers = response.data.filter(user => {
              return !likedUsers.some(likedUser => likedUser.user_id === user.user_id);
            });
            
            setUsers(filteredUsers);
            
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const swiped = (direction, user) => {
        setSwipedUsers([...swipedUsers, user.email]);

        if (direction === 'right') {
           axios.put('http://localhost:8080/addmatch', {
           userId: JSON.parse(localStorage.getItem('token')).userId,
           matchedUserId: user.user_id,
           })
            .then((response) => {
             console.log(response);
             setLikedUsers(response.data);
             
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
    console.log("liker USers are here ::::")
    console.log(users)

    console.log(likedUsers)



  };

  if (props.type !== 'Matches') {
    return null;
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
<<<<<<< HEAD
        {users.map(user =>
          <TinderCard className='swipe' key={user._id}
            onSwipe={(dir) => swiped(dir, user.email)}
            onCardLeftScreen={() => outOfFrame(user.email)}>
            <div style={{ backgroundImage: 'url(' + user.photos[0] + ')' }}
              className='card'>
              <h3>{user.first_name}</h3>
            </div>
          </TinderCard>
        )}
        <div className='swipe-info'> 
          {lastDirection ? <p>{lastDirection}</p>:<p/> }
        </div>
=======
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
                <CardsCarousel photos={user.photos} />
                <h3 className='user-name-cards'>{user.first_name}</h3>
              </div>
            </TinderCard>
          ) : null
        ))}
>>>>>>> ac656cf5ce8c2dd0b88fc23edbe2defb0d1934ce
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

