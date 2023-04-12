import React, { useEffect, useState } from 'react'
import messageManager from '../../model/messageManager'
import "./chat.scss"
import axios from 'axios'


function Chat(props) {

    const [messages, setMessages] = useState([])
    console.log(props.correspondingUserId,props.loggedUser)

    useEffect(() => {
        messageManager.getMessages(props.loggedUser, props.correspondingUserId)
            .then(messagesTo => {
                setMessages(messagesTo)
            })
        messageManager.getMessages(props.correspondingUserId,props.loggedUser)
            .then(messagesFrom => {
                let allMsgs = [...messages,messagesFrom]
                allMsgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                setMessages(allMsgs)
            })



    }, [])



    return (
        <div>
            <div className='messagesContainer'>{
                messages.map((message,index) => {
                    return message = <span key={index}><div className='message'>
                        <div>
                            <img src='http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg' className='userPhoto'></img>
                            <p>"username"</p>
                            <p>{message.message}</p>
                            <p>{message.timestamp}</p>
                        </div>

                    </div></span>
                })
            }</div>
        </div>
    )
}

export default Chat