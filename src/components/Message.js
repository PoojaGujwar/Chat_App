import "./message.css"
const Message = ({ messages, user, onBack }) => {
    let lastDate = ""
    const formateTime = (time) => {
        const date = new Date(time);
        // console.log(date, messages)
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    }
    const formateDate = (dateStr) => {
        const date = new Date(dateStr)
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return "Today"
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday"
        }
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    return (
        <>
            <button onClick={onBack} setUser={user} className="back-btn">
                <i className="bi bi-arrow-left fs-3"></i>
            </button>
            <div className="message-list">

                {messages.map((msg, index) => {
                    const messageDate = new Date(msg.createdAt).toDateString();
                    const showDate = messageDate != lastDate
                    lastDate = messageDate
                    return (
                        <div key={index}>
                            {showDate && <div className="date-separate">{formateDate(msg.createdAt)}</div>}
                            <div className="message-row">
                            <div

                                className={`message ${msg.sender === user.username ? "sent" : "received"
                                    }`}
                            >
                                <span>{msg.message}</span>
                                <span className="time">{formateTime(msg.createdAt)}</span>
                            </div>
                            </div>
                        </div>
                    )


                })}
            </div>
        </>
    )
}
export default Message