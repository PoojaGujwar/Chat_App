import "./message.css"
const Message =({messages,user,onBack})=>{

    const formateTime =(time)=>{
        const date = new Date(time);
        console.log(date,messages)
        return date.toLocaleDateString([],{
            hour:"2-digit",
            minute:"2-digit"
        })
    }
   
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
                   <div>{formateTime(msg.createdAt)}</div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Message