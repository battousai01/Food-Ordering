import React,{useState} from 'react'
import './login.css'

const login = () => {

  const [currentState, setCurrentState] = useState('Login');
  return (
    <div>
      <form className="auth-form">
        <div className="form-header">
          <p className="form-titlee">{currentState}</p>
        </div>
          {currentState === 'Login' ? null : (
            <input type="text" className='form-input' placeholder='Full Name'  required/>  
          )
        }
        <input type="email" className='form-input' placeholder='Email' required />
        <input type="password" className='form-input' placeholder='Password' required  />
        <div className="form-footer">
          <p className='fgt-paddword'>Forgot Password</p>
          {
            currentState === 'Login' ? (<p className='toggle-auth-state' onClick={()=> setCurrentState('Sign Up')}>Create Account</p>) : 
            (<p className='toggle-auth-state' onClick={() => setCurrentState('Login')}>Login Here</p>) 
            
          }
        </div>
        <button type="submit" className='form-button'>
          {currentState === 'Login' ? 'Sign in' : 'Sign Up'} 
        </button>
      </form>  
    </div>
  )
}

export default login