import React from 'react'

export const Messages = (props) => {
    return (
        <div>
            <h5 className="title text-center"  >
                Chat <i className="fas fa-archway"></i> Box
                            </h5>
            {props.messages.map(user => {
                return (
                    user.username !== "Chat Bot" ?
                        <div key={user.username} className="messages">
                            <span className="m1">{user.username} :</span>
                            <span className="m2">{user.text}</span>
                        </div> : <div key={user.username} className="chat-bot" >
                            <span className="m1">{user.username} :</span>
                            <span className="m2">{user.text}</span>
                        </div>
                )

            })}
        </div>
    )
}
