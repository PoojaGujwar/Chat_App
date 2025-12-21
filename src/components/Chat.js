import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import "./chat.css"
import {io} from "socket.io-client"
import { useNavigate, Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";




const socket = io(`https://chat-chat-if63.onrender.com`)

export default function Chat({ user, setUser}) {
  const [users, setUsers] = useState([]);
  const [messages, setMessage] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = React.useRef(null);
  const [showEmoji, setShowEmoji] = useState(false)
  const navigate = useNavigate()
  const socketRef = React.useRef(null)

  useEffect(() => {
  socketRef.current = io("https://chat-chat-if63.onrender.com");

  return () => {
    socketRef.current.disconnect();
  };
}, []);


  useEffect(() => {
    if (user?.username && socketRef.current) {
      socketRef.current.emit("join", user.username);
    }
  }, [user]);

  useEffect(() => {
    if (!socketRef.current) return;

    const fetchUsers = async () => {
      try {
        const { data } = await axios(
          `https://chat-chat-if63.onrender.com/users`,
          { params: { currentUser: user.username } }
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();

    socketRef.current.on("receive_message",(data)=>{
      if(data.sender === currentChat || data.receiver === currentChat){
        setMessage((prev)=>[...prev,data])
      }
    })
    socketRef.current.on("typing",({sender})=>{
      if(sender && sender === currentChat){
        setIsTyping(true)
      }
    })
    socketRef.current.on("stop_typing",({sender})=>{
      if(sender === currentChat){
        setIsTyping(false);
      }
    })
    return ()=>{
      socketRef.current.off('receive_message')
      socketRef.current.off("typing")
      socketRef.current.off("stop_typing")
    }
  }, [currentChat]);

  const fetchMessage = async (receiver) => {
    try {
      const { data } = await axios.get(
        `https://chat-chat-if63.onrender.com/messages`,
        { params: { sender: user.username, receiver } }
      );
      console.log(data);
      setMessage(data);
      setCurrentChat(receiver);
    } catch (error) {
      console.error("Error fetching message", error);
    }
  };

  const sendMessage = () => {
    const messageData ={
      sender:user.username,receiver:currentChat,message:currentMessage,createdAt: new Date().toISOString()
    }
    console.log(messageData)
    socketRef.current.emit("send_message",messageData)
    setMessage((prev)=>[...prev,messageData])
    setCurrentMessage('')
  };

  const handleTyping =(e)=>{
    setCurrentMessage(e.target.value)
console.log("Emit typinnn", currentChat, e.target.value)
    if(socketRef.current){
 socketRef.current.emit("typing",{
      sender:user.username,
      receiver:currentChat
    })
    }
   
    if(typingRef.current){
      clearTimeout(typingRef.current)
    }
    typingRef.current = setTimeout(()=>{
      socketRef.current.emit("stop_typing",{
        sender: user.username,
        receiver: currentChat
      })
    },1000)
  }
  const handleLogout =()=>{
    setUser(null)
    navigate("/login")
  }
  const handleBackToChat =()=>{
    setCurrentChat(null)
    setMessage([])
  }
const onEmojiClick =(emojiData)=>{
  console.log(emojiData)
  setCurrentMessage((preValue)=>preValue+emojiData.emoji)
  setShowEmoji(false)
}
  return (
    <>
    <div className="chat-container">
      <div className="chat-header">
      <h1>Chat App</h1>
      <button onClick={handleLogout} className="btn-primary">Logout</button>
      </div>
      </div>
    <div className="chat-body">
      <div className="chat-sidebar">
        <h3>Chats</h3>
        {users.map((u) => (
          <div
          className={`chat-user ${currentChat === u.username?"active":""}`}
           onClick={() => fetchMessage(u.username)}>{u.username}</div>
        ))}
        </div>
        <div className="chat-main">
        {currentChat && (
        <>
            <div className="messages-area">
            {/* <h5>You are chatting with {currentChat}</h5> */}
            <Message messages={messages} user={user} onBack ={handleBackToChat}/>
            {isTyping && (
              <p style={{fontSize:"12px",color:"pink"}}>{currentChat} is typing</p>
            )}
            </div>
            <div className="message-field">
              <input
                type="text"
                placeholder="Types a message.."
                value={currentMessage}
                onChange={handleTyping}
              />
                {showEmoji && <div className="emoji-box"><EmojiPicker onEmojiClick={onEmojiClick}/></div>}
      
              <button onClick={()=>setShowEmoji(!showEmoji)}
              className="btn-emoji btn-primary" >😊</button>
              <button className="btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
      </div>
      </>
    
  );
}
