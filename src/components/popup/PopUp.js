import React, { useEffect, useState } from 'react'
import "./PopUp.scss"

function PopUp(props) {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Change the time to adjust how long the notification stays visible (in milliseconds)

        return () => clearTimeout(timer);
    }, [])

    const letters = props.message.split('');
    let delay = 0;

    return (
        showNotification && <div className={`notifiesSuper`}>
            {letters.map((letter, index) => {
                delay += 0.1;

                if (letter === ' ') {
                    return <span key={index}>&nbsp;</span>;
                }

                return (
                    <span
                        key={index}
                        className="wiggle"
                        style={{ animationDelay: `${delay}s` }}
                    >
                        {letter}
                    </span>
                );
            })}
        </div>
    )
}

export default PopUp