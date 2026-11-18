import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router'
import { useAuth } from '../hooks/useauth'


import './Login.scss'
const Register = () => {
  const navigate= useNavigate()
      const {loading , hadleRegister}= useAuth()  
      const[username, setUsername] = useState('')  
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")  
        const handleSubmit= async (e)=>{
        e.preventDefault()
       await hadleRegister({email,username,password})
         navigate('/')
    }
     if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
  return (
      <main>
        <div className="form-container">
              <h1>Register User</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
               <label htmlFor="username">Username</label>
               <input  onChange={(e)=>{setUsername(e.target.value)}}
                id="username" name="username" type="text" placeholder='Enter username' />
                </div>
                <div className="input-group">
               <label htmlFor="email">Email</label>
               <input  onChange={(e)=>{setEmail(e.target.value)}}
                id="email" name="email" type="email" placeholder='Enter email or username' />
                </div>
                 <div className="input-group">
               <label htmlFor="password">Password</label>
               <input  onChange={(e)=>{setPassword(e.target.value)}}
               id="password" name="password" type="password" placeholder='Enter password'/>
                </div>
                <button className='button register-button'>Register</button>
            </form>
            <p>Already have an account? <Link className="register-link"  to={'/login'}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
