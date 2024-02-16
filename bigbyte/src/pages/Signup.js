import React, { useState } from 'react';
import '../Login.css';


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
    //send the data to backend once its all set and done
}

    return (
        <div>
        <label htmlFor="username">Username/Email:</label>
        <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={handleUsernameChange} 
            placeholder="Enter your username or email" 
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


