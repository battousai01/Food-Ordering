import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { backendUrl } from '../../App';
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');  

  const OnSubmitHandler = async(e) => {
    try{
      e.preventDefault()
      console.log("backendUrl in production:", backendUrl); // log for debugging admin login

      const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
      console.log(response)

      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }


      /*console.log(email,password)*/
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className="admin-panel-container">
        <div className="admin-panel-box">
          <h1 className="login-tilte">Admin Panel</h1>
          <form onSubmit={OnSubmitHandler}>
            <div className="form-group">
              <p className="form-label">Email Address</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Enter email' required></input>
            </div>
            <div className="form-group">
              <p className="form-label">Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Enter password' required></input>
            </div>
            <button className='form-button' type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
