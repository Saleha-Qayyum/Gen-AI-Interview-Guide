import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router'
import { useAuth } from '../hooks/useauth'
import './Login.scss'

const Login = () => {
     const navigate= useNavigate()
    const {loading , hadleLogin}= useAuth()
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit= async(e)=>{
        e.preventDefault()
        await hadleLogin({identifier, password})
        navigate('/')
    }
    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }
  return (
    <main>
        <div className="form-container">
                <h1>Login User</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
               <label htmlFor="identifier">Email or username</label>
               <input onChange={(e)=>{setIdentifier(e.target.value)}}
                id="identifier" name="identifier" type="text" placeholder='Enter email or username' />
                </div>
                 <div className="input-group">
               <label htmlFor="password">Password</label>
               <input onChange={(e)=>{setPassword(e.target.value)}}
               id="password" name="password" type="password" placeholder='Enter password'/>
                </div>
                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account? <Link  className="login-link"  to={'/register'}>Register</Link> </p>

        </div>
    </main>
  )
}

export default Login
