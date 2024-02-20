import React, { useState } from 'react';
import '../Signup.css';


export default function Signup () 
{
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');


const handleUsernameChange = (event) => {
    setUsername(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

const SignUserUp = () =>

{
    const postData = {
        username: username,
        password: password
      };
      
      fetch('http://localhost:3001/api/v1/user/SignUp', {
        method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
        body: JSON.stringify(postData)
      })
      .then(response => {
        if (!response.ok) {
            console.log(response);
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
}

    return (
        <div>
        <label htmlFor="username">Email:</label>
        <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={handleUsernameChange} 
            placeholder="Place your email here" 
        />
        <label htmlFor="password">Password:</label>
        <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Enter your password" 
        />
         <button onClick={SignUserUp} type="submit">Sign Up</button>
    </div>
    );
}


