import React from 'react'

export const LeftMenu = (props) => {
    return (
        <div className="col-xl-3 col-md-2  col-xs-3 card  left-menu ">
            <div className="room-menu">
                <h5 ><i className="fas fa-rocket"></i> Room Name</h5>

                <div>{props.room}</div>
            </div><br />
            <div className="user-menu">
                <h5><i className="fas fa-users"></i> Users</h5>

                {props.users.map(user => {
                    return (<span key={user.username} className="um1">·  {user.username}</span>)
                })}

            </div>
        </div>
    )
}
