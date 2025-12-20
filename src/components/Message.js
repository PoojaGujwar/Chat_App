import "./message.css"
const Message =({messages,user, onBack})=>{
   
    return (
        <>
        <button onClick={onBack} setUser={user} className="back-btn">
                    <i className="bi bi-arrow-left fs-3"></i>
        </button>
        <div className="message-list">

            {messages.map((msg,index)=>(
                <div
                key={index}
                 className={`message ${
            msg.sender === user.username ? "sent" : "received"
          }`}
                >
                   {msg.message}
                </div>
            ))}
        </div>
        </>
    )
}
export default Message