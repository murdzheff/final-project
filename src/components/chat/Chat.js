import React, { useEffect, useState, useRef } from 'react';
import messageManager from '../../model/messageManager';
import './chat.scss';
import socketIOClient from 'socket.io-client';
import userManager from '../../model/userManager';
import EmojiPicker from 'emoji-picker-react';
import Arrow from "./send-mail.png"
import Emoj from "./emoji.png"
import Info from "./info.png"

function Chat(props) {

    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [displayEmo, setDisplayEmo] = useState(false)
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

    function sortByTimestamp(objects) {
        return objects.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }



    async function update(id) {
        await messageManager.getMessages(props.loggedUser.user_id, id).then(mess => {
            let sorted = sortByTimestamp(mess)
            setMessages(sorted)
        })
    }



    function getCurrentDatetime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hour = ('0' + now.getHours()).slice(-2);
        const minute = ('0' + now.getMinutes()).slice(-2);
        const second = ('0' + now.getSeconds()).slice(-2);
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }


    function handleSendMessage(e) {
        e.preventDefault();

        const message = {
            from: props.loggedUser.user_id,
            to: props.correspondingUserId,
            content: msg,
            timestamp: getCurrentDatetime(),
        };
        messageManager.sendMessage(message.from, message.to, message.content, message.timestamp)
        socket.emit('message', message);
        setLastMessage(msg);

        setMsg("")
    }

    useEffect(() => {

        setSender(props.loggedUser)

        userManager.getUserById(props.correspondingUserId)
            .then(res => {
                setRecipient(res)
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
                from: props.loggedUser.user_id,
                to: props.correspondingUserId,
                content: msg,
                timestamp: getCurrentDatetime(),
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

                    <div className='recipient'>
                        <img className="userPhoto" src={recipient?.photos[0]}></img>
                        <h3>{recipient.email}</h3>
                    </div>

                    <button onClick={() => { props.setType("info"); props.setInfoUser(recipient) }} className="checkProf">
                        <img src={Info}></img>
                    </button>
                </div>
                <div className="msgs">
                    {messages.length > 0 && recipient !== null ? (
                        messages.map((message, index) => (
                            <div className="message" key={index}>
                                <div className={message.from !== props.loggedUser.user_id ? 'incoming' : 'outgoing'}>
                                    <img className='messagePhoto' src={message.from !== props.loggedUser.user_id ? recipient?.photos[0] : sender?.photos[0]}></img>
                                    <p>{message.content} </p>
                                    <p className='time'>{message.timestamp.slice(10,)}</p>
                                </div>
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
                    <button className='emojiButton' onClick={() => (setDisplayEmo(!displayEmo))}>
                        <img src={Emoj}></img>
                    </button>
                    <div className="emojis">
                        {displayEmo ? <EmojiPicker onEmojiClick={(e) => { setMsg(msg => msg + e.emoji) }} /> : null}
                    </div>
                    <button

                        onClick={handleSendMessage}
                        className="sendMsg">
                        <img src={Arrow}></img>
                    </button>
                </div>
            </div>
        </div>

    );








}




export default Chat;
