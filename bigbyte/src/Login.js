import React, { useState } from 'react';
import "./Login.css"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Perform authentication here (e.g., send credentials to server)
        // For simplicity, let's just check if the username and password are not empty
        if (username && password) {
            setLoggedIn(true);
            alert('Login successful!');
        } else {
            alert('Please enter a username and password.');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    if (loggedIn) {
        return (
            <div>
                <h2>Welcome, {username}!</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}