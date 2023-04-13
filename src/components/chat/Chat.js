import React, { useEffect, useState } from 'react'
import messageManager from '../../model/messageManager'
import "./chat.scss"




function Chat(props) {
    let user = JSON.parse(localStorage.getItem("token")).userId

    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([])
    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        update()
    }, [])


    useEffect(() => {
        update()
    }, [lastMessage])


    function update() {
        messageManager.getMessages(user, props.correspondingUserId)
            .then(messagesTo => {
                setMessages(messagesTo)
                messageManager.getMessages(props.correspondingUserId, user)
                    .then(from => {
                        const allMsgs = [messages, ...from]
                        setMessages(allMsgs)
                        console.log(allMsgs)
                    })
            })

    }



    if (props.type !== "Chat") {
        return null;
    }

    function handleSendMessage(e) {

        console.log(user)
        e.preventDefault()
        messageManager.sendMessage(user, props.correspondingUserId, msg, new Date().toLocaleTimeString())
        setLastMessage(msg)
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
                        messages.length > 1 ? messages.map((message, index) => {
                            return message = <span key={index}>
                                <div className='message'>

                                    <span className={message.from !== user ? "incoming" : "outgoing"}>
                                        <p>{message.content}
                                            {message.timestamp}
                                        </p>
                                    </span>

                                </div></span>
                        }) : null
                    }


                </div>

                <div className='sendmsgContainer'>
                    <input onChange={(e) => { setMsg(e.target.value) }} className='chatInputs' type='text' placeholder='write something'></input>
                    <button onClick={handleSendMessage} className='sendMsg'>{">>>"}</button>
                </div>

            </div>


        </div>
    )
}

export default Chat