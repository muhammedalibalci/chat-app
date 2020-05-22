import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Home = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const onChange = (e) => {
    const { value, name } = e.target
    if (name === "username") setUsername(value)
    if (name === "room") setRoom(value)
  }

  return (
    <div className="home">
      <div className="box">
        <h2>CHAT APP</h2>
        <hr style={{backgroundColor:'white'}}/>
        <input type="text" placeholder="Username" name="username" className="username " onChange={onChange} />
        <input type="text" placeholder="Room" name="room" className="room" onChange={onChange} />
        <div className="button-outer">
          <Link to={{
            pathname: '/chat',
            state: { username: username, room: room }
          }} className="link" style={{textDecoration:'none'}}>
            <button className="button" ><i class="fas fa-sign-in-alt"></i> JOIN</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home