import React, { useEffect, useState } from 'react'
import messageManager from '../../model/messageManager'
import "./chat.scss"




function Chat(props) {



    const [messages, setMessages] = useState([])


    useEffect(() => {
        messageManager.getMessages(props.loggedUser, props.correspondingUserId)
            .then(messagesTo => {
                setMessages(messagesTo)
            })
        messageManager.getMessages(props.correspondingUserId, props.loggedUser)
            .then(messagesFrom => {
                let allMsgs = [...messages, messagesFrom]
                allMsgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                setMessages(allMsgs)
            })
    }, [])

    if (props.type !== "Chat") {
        return null;
    }

    return (
        <div className='chatContainer'>



            <div className='messagesContainer'>
                <div className='chatHeader'>
                    <div>
                        <img className='userPhoto' src='http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg'></img>
                        <h3>Стоян Колев</h3>
                    </div>
                    <div>
                        <button className='checkProf'>Check profile</button>
                    </div>
                </div>
                <div className='msgs'>
                    
                        {
                            messages.map((message, index) => {
                                return message = <span key={index}><div className='message'>
                                    <div>
                                        <img src='http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg' className='userPhoto'></img>
                                        <p>"username"</p>
                                        <p>{message.message}</p>
                                        <p>{message.timestamp}</p>
                                    </div>
                                </div></span>
                            })
                        }

                    
                </div>

                <div >
                    <input className='chatInputs' type='text' placeholder='write something'></input>
                    <button className='sendMsg'></button>
                </div>

            </div>


        </div>
    )
}

export default Chat