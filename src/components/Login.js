import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Register from './Register'

export default function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`https://chat-chat-if63.onrender.com/auth/login`, { username, password })
      setUser(data)
      console.log(data)
    }
    catch (error) {
      console.error(error.response?.data?.message || "Error logging in")
      setLoginSuccess(error.response?.data?.message || "Error logging in")
    }
    finally {
      setTimeout(() => {
        setLoginSuccess('')
      }, 2000)
    }
  }

  return (
    <div className='auth-container'>
      <div className='card auth-card'>
      <div className='card-body'>
        <h4>Login into Chat App</h4>
        <p className=''>Login with your credentials to continue.</p>
        {loginSuccess && <p>{loginSuccess}</p>}
        <form onSubmit={handleLogin}>
          <input type='text'
            placeholder='username'
            value={username}
            className='form-control'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <p>
          Don't have an account?{""}<Link to="/register">Register</Link>
        </p>
      </div>
    </div></div>

  )
}
