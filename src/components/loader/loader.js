import React, { useState, useEffect } from 'react';
import './loader.css';

function PhotoWithPulse(props) {
  const [size, setSize] = useState(140);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSize((size) => {
        let newSize = size + 1;
        if (newSize > 500) {
          newSize = 50;
          setOpacity(0.3);
        } else if (newSize > 200) {
          setOpacity((opacity) => opacity - 0.001);
        }
        return newSize;
      });
    }, 0);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    console.log('Click');
    const pulseElement = document.createElement('div');
    pulseElement.classList.add('pulse');
    document.body.appendChild(pulseElement);
  };

  const pulseStyle = {
    width: size,
    height: size,
    opacity: opacity,
  };

  return (
    <div className="photo" onClick={handleClick}>
      {/* <img className='photo-loader' src={props.imageSrc} alt="" /> */}
      <div className='photo-loader' style={{ backgroundImage: `url(${props.imageSrc})` }}></div>
      <div className="pulse" style={pulseStyle}></div>
    </div>
  );
}

export default PhotoWithPulse;
