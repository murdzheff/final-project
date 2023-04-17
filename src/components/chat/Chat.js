import React, { useEffect, useState, useRef } from 'react';
import messageManager from '../../model/messageManager';
import './chat.scss';
import socketIOClient from 'socket.io-client';
import userManager from '../../model/userManager';
import EmojiPicker from 'emoji-picker-react';

function Chat(props) {
    let user = JSON.parse(localStorage.getItem('token')).userId;
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [displayEmo,setDisplayEmo] = useState(false)
    const count = useRef(null)
    const [sender, setSender] = useState(null);
    const [recipient, setRecipient] = useState(null)
    const [isLoading, setIsLoading] = useState(0)
    const scrollToBottom = () => {
        count.current?.scrollIntoView({ behavior: "smooth" })
    }
    const chatInput = useRef("")
    
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        
        update(props.correspondingUserId)

    }, [props.correspondingUserId])

    useEffect(() => {
        // Connect to the server using socket.io
        const newSocket = socketIOClient('http://localhost:8080');
        setSocket(newSocket);

        // Listen for incoming messages from the server
        newSocket.on('messageRes', (message) => {
            setMessages(messages => [...messages, message].sort((a, b) => b.timestamp - a.timestamp))
        });



        // Disconnect the socket when the component unmounts
        return () => {
            newSocket.disconnect();
        };


    }, [props.correspondingUserId]);

    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    function sortByTimestamp(array) {
        return array.sort((a, b) => {
          const timestampA = new Date(a.Timestamp);
          const timestampB = new Date(b.Timestamp);
          return timestampA - timestampB;
        });
    }
      

    async function update(id) {
        await Promise.all([
            messageManager.getMessages(user, id),
            messageManager.getMessages(id,user)
        ]).then(([messagesTo, messagesFrom]) => {
            let allMsgs = [...messagesTo, ...messagesFrom];
            let sorted = sortByTimestamp(allMsgs)
            setMessages(sorted);
        });
    }



    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = padZero(now.getMonth() + 1);
        const day = padZero(now.getDate());
        const hour = padZero(now.getHours());
        const minute = padZero(now.getMinutes());
        const second = padZero(now.getSeconds());
        const date = `${year}-${month}-${day}`;
        const time = `${hour}:${minute}:${second}`;
        return `${date} ${time}`;
      }

    function handleSendMessage(e) {
        e.preventDefault();
        
        const message = {
            from: user,
            to: props.correspondingUserId,
            content: msg,
            timestamp: getCurrentDateTime(),
        };
        messageManager.sendMessage(message.from, message.to, message.content, message.timestamp)
        socket.emit('message', message);
        setLastMessage(msg);

        setMsg("")
    }

    useEffect(() => {
        userManager.getUserById(user).then(response => {
            setSender(response)
            
            userManager.getUserById(props.correspondingUserId)
            .then(res => {
                setRecipient(res)
            })
            
        })


    }, [props.correspondingUserId])

    if (props.type !== 'Chat') {
        return null;
    }

    if (recipient === null) {
        
        return <div>Loading...</div>;
    }

    function handleEnter(e) {
        if (e.key == "Enter") {
            e.preventDefault();
            const message = {
                from: user,
                to: props.correspondingUserId,
                content: msg,
                timestamp: new Date().toLocaleTimeString(),
            };
            messageManager.sendMessage(message.from, message.to, message.content, message.timestamp)
            socket.emit('message', message);
            setLastMessage(msg);
            setMsg("")
        }
    }



    return (
        <div className="chatContainer" onClick={displayEmo ? () => setDisplayEmo(false) : null}>
            <div className="messagesContainer">
                <div className="chatHeader">
                    <img className="userPhoto" src={recipient?.photos[0]}></img>
                    <h3>{recipient.email}</h3>
                    <button className="checkProf">Check profile</button>
                </div>
                <div className="msgs">
                    {messages.length > 0 && recipient !== null ? (
                        messages.map((message, index) => (
                            <div className="message" key={index}>
                                <span className={message.from !== user ? 'incoming' : 'outgoing'}>
                                    <img className='messagePhoto' src={message.from !== user ? recipient?.photos[0] : sender?.photos[0]}></img>
                                    <p>{message.content} </p>
                                    <p className='time'>{message.timestamp}</p>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div>No messages yet</div>
                    )}

                    <div style={{ float: "left", clear: "both" }} ref={count}></div>
                </div>
                <div className="sendmsgContainer">
                    <input
                        ref={chatInput}
                        value={msg}
                        onKeyDown={handleEnter}
                        onChange={(e) => setMsg(e.target.value)}
                        className="chatInputs" type="text"
                        placeholder="write something"></input>
                        <button className='emojiButton' onClick={() => (setDisplayEmo(!displayEmo))}>{":)"}</button>
                        <div className="emojis">
                            {displayEmo ? <EmojiPicker  onEmojiClick={(e) => {setMsg(msg => msg + e.emoji)}}/> : null}
                        </div>
                    <button

                        onClick={handleSendMessage}
                        className="sendMsg">
                        {">>>"}
                    </button>
                </div>
            </div>
        </div>

    );








}




export default Chat;
