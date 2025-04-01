import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Landing() {

  const [submitData, setsubmitData] = useState({
    Username: "",
    Password: ""
  });


  function submit(){

    if (!submitData.Username || !submitData.Password){
      alert('Please fill out username and password submitting.');
      return;
    }

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
        }else{
          alert('Incorrect Login')
        }
      })

  }

  return (
    <>

    </>
  )
}