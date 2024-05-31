import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "./css/Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            console.log('Login successful', response.data);

            // Store token if needed
            localStorage.setItem('token', response.data.access_token);

            // Redirect to home
            navigate('/home');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Login failed', err);
        }
    };

    return (
        <div className="background">

            <nav className="loginNav">
                <h1>KC Media</h1>
                <div>
                    <NavLink to="/register">
                        <button>Register</button>
                    </NavLink>
                    <NavLink to="/login">
                        <button>Login</button>
                    </NavLink>
                </div>
            </nav>

            <div className="form-container">
                <form onSubmit={handleLogin}>
                    <p className="form-title">Login</p>
                    <div className="form-field">
                        <p>Email</p>
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <p>Password</p>
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="forgot-password">
                        <a href="#" className="forgot-password-link">Forgot password?</a>
                    </div>
                    <input className="submit-button" type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default Login;
