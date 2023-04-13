import React, { useEffect, useState } from 'react'
import messageManager from '../../model/messageManager'
import "./chat.scss"




function Chat(props) {
    let user = JSON.parse(localStorage.getItem("token")).userId

    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([])
    

    useEffect(() => {
        messageManager.getMessages(user, props.correspondingUserId)
            .then(messagesTo => {
                setMessages(messagesTo)
            })
        messageManager.getMessages(props.correspondingUserId, user)
            .then(messagesFrom => {
                let allMsgs = [...messages, messagesFrom]
                allMsgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                console.log(allMsgs)
                setMessages(allMsgs)
                console.log(messages)
            })
    }, [])

   

    if (props.type !== "Chat") {
        return null;
    }

    function handleSendMessage(e) {
        console.log(user)
        e.preventDefault()
        messageManager.sendMessage(user,props.correspondingUserId,msg, new Date().toLocaleTimeString()) 
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
                                console.log(message)
                                return message = <span key={index}><div className='message'>
                                    {message.content}
                                </div></span>
                            })
                        }

                    
                </div>

                <div className='sendmsgContainer'>
                    <input onChange={(e) => {setMsg(e.target.value)}} className='chatInputs' type='text' placeholder='write something'></input>
                    <button onClick={handleSendMessage} className='sendMsg'>{">>>"}</button>
                </div>

            </div>


        </div>
    )
}

export default Chat