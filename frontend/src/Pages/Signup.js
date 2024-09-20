import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style.css'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const result = await axios.post('https://authentication-backend-uz8u.onrender.com/api/signup', formData)
            if (result.data.success) {
                navigate('/login')
                toast.success(result.data.message, {
                    autoClose: 3000
                })
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
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" disabled={loading} className="submit-btn">{loading ? 'Signing up...' : 'Sign up'}</button>
                        <div className="signup-redirect">
                            <p>Already have an account?</p>
                            <button type="button" className="login-btn" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Signup