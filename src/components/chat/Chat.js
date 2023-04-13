import React, { useEffect, useState, useRef } from 'react';
import messageManager from '../../model/messageManager';
import './chat.scss';
import socketIOClient from 'socket.io-client';

function Chat(props) {
  let user = JSON.parse(localStorage.getItem('token')).userId;
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState('');
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    update()
  },[])

  useEffect(() => {
    // Connect to the server using socket.io
    const newSocket = socketIOClient('http://localhost:8080');
    setSocket(newSocket);
  
    // Listen for incoming messages from the server
    newSocket.on('messageRes', (message) => {
        console.log(message)
    });
  
    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);



  

  
   
  
  

  function update() {
    console.log("tuka sym")

    messageManager
      .getMessages(user, props.correspondingUserId)
      .then((messagesTo) => {
        messageManager.getMessages(props.correspondingUserId, user)
        .then((from) => {
          const allMsgs = [messages, ...from];
          
          setMessages(allMsgs);
          
        });
      });
  }

  if (props.type !== 'Chat') {
    return null;
  }

  function handleSendMessage(e) {
    e.preventDefault();
    const message = {
      from: user,
      to: props.correspondingUserId,
      content: msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    messageManager.sendMessage(message.from,message.to,message.content,message.timestamp)
    socket.emit('message', message);
    setLastMessage(msg);
  }

  return (
    <div className="chatContainer">
      <div className="messagesContainer">
        <div className="chatHeader">
          <div>
            <img
              className="userPhoto"
              src="http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/12/Best-Quality-Profile-Images-Pic-Download-2023.jpg"
            ></img>
            <h3>Стоян Колев</h3>
          </div>
          <div>
            <button className="checkProf">Check profile</button>
          </div>
        </div>
        <div className="msgs">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div className="message" key={index}>
                <span className={message.from !== user ? 'incoming' : 'outgoing'}>
                  <p>
                    {message.content} {message.timestamp}
                  </p>
                </span>
              </div>
            ))
          ) : (
            <div>No messages yet</div>
          )}
        </div>
        <div className="sendmsgContainer">
          <input onChange={(e) => setMsg(e.target.value)} className="chatInputs" type="text" placeholder="write something"></input>
          <button onClick={handleSendMessage} className="sendMsg">
            {">>>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
