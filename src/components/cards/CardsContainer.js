import React, { useState } from 'react';
import Card from './Cards';
const CardContainer = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
  
    const handleSwipe = (dir) => {
      setCurrentIndex((prevIndex) =>
        dir === 'left'
          ? prevIndex === 0
            ? cards.length - 1
            : prevIndex - 1
          : prevIndex === cards.length - 1
          ? 0
          : prevIndex + 1
      );
    };
  
    const handleMouseDown = (event, index) => {
      setMouseDown(true);
      setStartX(event.clientX);
      setCurrentIndex(index);
    };
  
    const handleMouseMove = (event) => {
      if (!mouseDown) {
        return;
      }
      setCurrentX(event.clientX);
    };
  
    const handleMouseUp = () => {
      setMouseDown(false);
      const distance = currentX - startX;
      if (distance < -50) {
        handleSwipe('right');
      } else if (distance > 50) {
        handleSwipe('left');
      }
      setCurrentX(startX);
    };
  
    const handleDragEnd = (clientX) => {
      console.log('Card dropped at X position:', clientX);
    };
  
    return (
      <div
        className="card-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            className={
              index === currentIndex
                ? 'active'
                : index === currentIndex + 1 ||
                  (currentIndex === cards.length - 1 && index === 0)
                ? 'next'
                : 'prev'
            }
            onDragEnd={handleDragEnd}
            index={index}
            currentX={currentX}
          />
        ))}
        <div className="buttons">
          <button onClick={() => handleSwipe('left')}>&lt;</button>
          <button onClick={() => handleSwipe('right')}>&gt;</button>
        </div>
      </div>
    );
  };
  

export default CardContainer;