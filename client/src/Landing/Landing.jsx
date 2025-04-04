import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import {useManager} from '../Context'
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom';




export default function Landing() {

  const moveto = useNavigate()


  const [submitData, setsubmitData] = useState({
    Username: "",
    Password: ""
  });
  const [newUser, setNewUser] = useState({
    First_Name: "",
    Last_Name: "",
    Username: "",
    Password: ""
  })

  const {loggedIn, setLoggedin} = useManager()


  function submit(){



    fetch('http://localhost:3000/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: submitData.Username,
          Password: submitData.Password
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log("server response:", data)
        console.log(data.success)
        if(data.success == true){
          alert('Login Successful')
          setLoggedin(submitData.Username)
          moveto('/items')
        }else{
          alert('Incorrect Login')
        }
      })

  }

  function create(){
    fetch('http://localhost:3000/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          First_Name: newUser.First_Name,
          Last_Name: newUser.Last_Name,
          Username: newUser.Username,
          Password: newUser.Password
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log("server response:", data)
        console.log(data.success)
        if(data.success == true){
          alert('New User Created! And Logged In!')
          setLoggedin(newUser.Username)
          moveto('/items')
        }else{
          alert('User Creation Failed')
        }
      })

  }

  return (
    <>
      <div className="loggedin">
        <p className="title">INVENTORY MANAGER</p>
        <button className="button"><Link to={'/items'}>ALL ITEMS</Link></button>
      {loggedIn && <p className="log">Logged in as: {loggedIn}</p>}
      {Logout()}
      </div>
      <div className="forms">
       <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={(stop) => {
          stop.preventDefault();
          submit();
        }}
      >
        <div>
          <label>Username</label>
          <input
            type="text"
            value={submitData.Username}
            onChange={(user) => setsubmitData({ ...submitData, Username: user.target.value })}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={submitData.Password}
            onChange={(pw) => setsubmitData({ ...submitData, Password: pw.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    <div className="user-form">
      <h2>Create New User</h2>
      <form onSubmit={(stop) => {
        stop.preventDefault();
        create();
      }}
      >
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={newUser.First_Name}
            onChange={(first) => setNewUser({ ...newUser, First_Name: first.target.value})}
            required
            />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={newUser.Last_Name}
            onChange={(last) => setNewUser({ ...newUser, Last_Name: last.target.value})}
            required
            />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={newUser.Username}
            onChange={(user) => setNewUser({ ...newUser, Username: user.target.value})}
            required
            />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={newUser.Password}
            onChange={(pw) => setNewUser({ ...newUser, Password: pw.target.value})}
            required
            />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}