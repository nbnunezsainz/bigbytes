import React, { useState } from 'react';
import "../Login.css"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    

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
        <div className="Login">
      

        
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

const handleLogin = ({username,password}) => {
    const postData = {
        username: username,
        password: password
      };
      
      fetch('http://localhost:3001/login', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
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