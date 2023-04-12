import React from 'react'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'

function CardsContainer(props) {
  const user = JSON.parse(localStorage.getItem("token").userId || null)

  
  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Andrew Tate',
      https: 'https://static01.nyt.com/images/2022/08/24/multimedia/24xp-tate/24xp-tate-superJumbo.jpg?quality=75&auto=webp'
    },
    {
      name: 'Jared Dunn',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    }
  ]

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  if(props.type !== "Matches") {
    return null;
  }



  return (
    <div className='swipe-container'>

      <div className='card-container'>
      {characters.map((character) =>
          <TinderCard  className='swipe' key={character.name} 
                   onSwipe={(dir) => swiped(dir, character.name)} 
                 onCardLeftScreen={() => outOfFrame(character.name)}>
             <div style={{ backgroundImage: 'url(' + character.url + ')' }}
                 className='card'>

              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
        <div className='swipe-info'> 
        {lastDirection ? <p>Yo swiped {lastDirection}</p>:<p/> }
         </div>
      </div>

    </div>
  )
}

export default CardsContainer
















































//import React, { useState } from 'react';
// import Card from './Cards';
// const CardContainer = ({ cards }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [mouseDown, setMouseDown] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [currentX, setCurrentX] = useState(0);
  
//     const handleSwipe = (dir) => {
//       setCurrentIndex((prevIndex) =>
//         dir === 'left'
//           ? prevIndex === 0
//             ? cards.length - 1
//             : prevIndex - 1
//           : prevIndex === cards.length - 1
//           ? 0
//           : prevIndex + 1
//       );
//     };
  
//     const handleMouseDown = (event, index) => {
//       setMouseDown(true);
//       setStartX(event.clientX);
//       setCurrentIndex(index);
//     };
  
//     const handleMouseMove = (event) => {
//       if (!mouseDown) {
//         return;
//       }
//       setCurrentX(event.clientX);
//     };
  
//     const handleMouseUp = () => {
//       setMouseDown(false);
//       const distance = currentX - startX;
//       if (distance < -50) {
//         handleSwipe('right');
//       } else if (distance > 50) {
//         handleSwipe('left');
//       }
//       setCurrentX(startX);
//     };
  
//     const handleDragEnd = (clientX) => {
//       console.log('Card dropped at X position:', clientX);
//     };
  
//     return (
//       <div
//         className="card-container"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         {cards.map((card, index) => (
//           <Card
//             key={index}
//             image={card.image}
//             title={card.title}
//             description={card.description}
//             className={
//               index === currentIndex
//                 ? 'active'
//                 : index === currentIndex + 1 ||
//                   (currentIndex === cards.length - 1 && index === 0)
//                 ? 'next'
//                 : 'prev'
//             }
//             onDragEnd={handleDragEnd}
//             index={index}
//             currentX={currentX}
//           />
//         ))}
//         <div className="buttons">
//           <button onClick={() => handleSwipe('left')}>&lt;</button>
//           <button onClick={() => handleSwipe('right')}>&gt;</button>
//         </div>
//       </div>
//     );
//   };
  

// export default CardContainer;









































// import React, { useState } from 'react';
// import Card from './Cards';
// const CardContainer = ({ cards }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [mouseDown, setMouseDown] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [currentX, setCurrentX] = useState(0);
  
//     const handleSwipe = (dir) => {
//       setCurrentIndex((prevIndex) =>
//         dir === 'left'
//           ? prevIndex === 0
//             ? cards.length - 1
//             : prevIndex - 1
//           : prevIndex === cards.length - 1
//           ? 0
//           : prevIndex + 1
//       );
//     };
  
//     const handleMouseDown = (event, index) => {
//       setMouseDown(true);
//       setStartX(event.clientX);
//       setCurrentIndex(index);
//     };
  
//     const handleMouseMove = (event) => {
//       if (!mouseDown) {
//         return;
//       }
//       setCurrentX(event.clientX);
//     };
  
//     const handleMouseUp = () => {
//       setMouseDown(false);
//       const distance = currentX - startX;
//       if (distance < -50) {
//         handleSwipe('right');
//       } else if (distance > 50) {
//         handleSwipe('left');
//       }
//       setCurrentX(startX);
//     };
  
//     const handleDragEnd = (clientX) => {
//       console.log('Card dropped at X position:', clientX);
//     };
  
//     return (
//       <div
//         className="card-container"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         {cards.map((card, index) => (
//           <Card
//             key={index}
//             image={card.image}
//             title={card.title}
//             description={card.description}
//             className={
//               index === currentIndex
//                 ? 'active'
//                 : index === currentIndex + 1 ||
//                   (currentIndex === cards.length - 1 && index === 0)
//                 ? 'next'
//                 : 'prev'
//             }
//             onDragEnd={handleDragEnd}
//             index={index}
//             currentX={currentX}
//           />
//         ))}
//         <div className="buttons">
//           <button onClick={() => handleSwipe('left')}>&lt;</button>
//           <button onClick={() => handleSwipe('right')}>&gt;</button>
//         </div>
//       </div>
//     );
//   };
  

// export default CardContainer;