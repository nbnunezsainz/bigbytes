import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    const handleLogin = () => {
        const postData = {
            username: username,
            password: password
        };

        fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            // Check if the login was successful
            if (data.message === 'Login successful') {
                // Redirect to the next page
                window.location.href = '/nextpage.html'; // Replace with your next page URL
            } else {
                console.error('Login failed:', data.message);
                // Handle login failure
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };

    if (loggedIn) {
        return (
            <div className="Welcome">
                <h2>Welcome, {username}!</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="Login">
            <div className="form-elements">
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
              <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}
