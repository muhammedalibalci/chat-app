import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import { useState } from 'react';
import './Chat.css'
import { LeftMenu } from '../../components/LeftMenu';
import { Messages } from '../../components/Messages';
const Chat = (props) => {
    const [socket, setSocket] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log();

        const socket = socketIOClient('http://localhost:8000');
        const { username, room } = props.location.state
        setSocket(socket)
        socket.on('message', (msg) => {


            setMessages(messages => [...messages, msg])
        })
        socket.emit('joinRoom', { username, room });

        socket.on('roomUsers', ({ room, users }) => {
            setUsers([...users])
        });

        socket.on('roomUsers', ({ room, users }) => {
            console.log(users);
            
            setUsers([...users])
        })
        return () => {
            socket.emit('disconnect');
        }
    }, [])

    const onClickEnter = (e) => {
        if (e.key === 'Enter') {
            Object.assign(props.location.state, { text: message })
            socket.emit('chatMessage', props.location.state)
            setMessage('')
        }

    }

    return (
        <div className="container">
            <div className="row">

                <LeftMenu users={users} room={props.location.state.room}/>
                
                <div className="col-xl-6 col-md-4 col-xs-4    chat ">
                    <div className="overflow-auto shadow chat-box ">

                        <Messages messages={messages}/>

                        <div className="bottom">
                            <input type="text" value={message} placeholder="Message" onKeyDown={onClickEnter} className="message-input " onChange={(e) => { setMessage(e.target.value) }} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default withRouter(Chat)