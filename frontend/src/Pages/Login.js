import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const result = await axios.post('https://authentication-backend-uz8u.onrender.com/api/login', { email, password })

            if (result.data.success) {
                localStorage.setItem('userToken', result.data.data.token)
                navigate('/')
                setTimeout(() => {
                    toast.success(result.data.message, {
                        autoClose: 3000
                    })
                }, 500)
            } else {
                toast.error(result.data.message, {
                    autoClose: 3000
                })
            }
        } catch (err) {
            toast.error(err.data.message || "Something went wrong.", {
                autoClose: 3000
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        <div className="signup-redirect">
                            <p>Don't have an account?</p>
                            <button type="button" className="login-btn" onClick={() => navigate('/signup')}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Login
