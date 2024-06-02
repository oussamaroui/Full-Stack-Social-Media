import { useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import "./css/Register.css"

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState(null); // Change from "" to null to handle file
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', password);
        if (pic) {
            formData.append('profile_pic', pic);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setSuccess("Registration successful!");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setPic(null); // Reset file input
            } else {
                setError("Registration failed");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setError("Unprocessable content. Please check your input.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
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
                <form onSubmit={handleSubmit}>
                    <p className="form-title">Register</p>
                    <div className="form-field">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={first_name}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={last_name}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="profile_pic">Profile Picture</label>
                        <input
                            id="profile_pic"
                            type="file"
                            name="profile_pic"
                            onChange={(e) => setPic(e.target.files[0])}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                    <input
                        className="submit-button"
                        type="submit"
                        value={isLoading ? "Registering..." : "Register"}
                        disabled={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
