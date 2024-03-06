import React, { useState,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import '../Login.css';
import {Link, Navigate } from 'react-router-dom';

import { useAuth } from ".././AuthContext.js";


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [redirectToUserData, setRedirectToUserData] = useState(false);
    const { currentUser, login, setError } = useAuth();

    // useEffect(() => {
    //     if (currentUser) {
    //     setRedirectToUserData(true)
    //     }
    //   }, [currentUser]);
    
   const handleLogin2 = async () =>{
        
    
        try {
          //setError("");
          //setLoading(true);
          await login(username, password);
          setRedirectToUserData(true);
        } catch (e) {
          //setError("Failed to login");
          setRedirectToUserData(false);
        }
      }

    // const handleLogin = () => {
    //     const postData = {
    //         email: username,
    //         password: password
    //     };

    //     fetch('http://localhost:3001/api/v1/user/login', {
    //         method: 'POST',
    //          headers: {
    //            'Content-Type': 'application/json'
    //          },
    //         body: JSON.stringify(postData)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Response from server:', data);
    //         // Check if the login was successful
    //         if (data.success) {
    //             // Redirect to the next page
    //             setRedirectToUserData(true);
    //         } else {
    //             console.error('Login failed:', data.message);
    //             // Handle login failure
    //         }
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with your fetch operation:', error);
    //     });
    // };
 

    //uncoment this once we have a page created 
     if (redirectToUserData) {
         return <Navigate to="/Internships" />;
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
              <Button onClick={handleLogin2}>Login</Button>
            </div>
        </div>
    );
}
