import React from 'react';
import '../Home.css';
import { Outlet, Link } from "react-router-dom";

function Home () 
{
    return (
        <div>
            <Navbar/>
            <MainContent/>

        </div>
    )
}export default Home;

function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li>
                <Link to="/Login">Login</Link>
                <Link to="/SignUp">Sign Up</Link>
                </li>
                   
            </ul>
        </nav>
    );

}
function MainContent() {
    return (
        <div className="container">
            <div className="content">
                <h1>Welcome to My Awesome Homepage</h1>
                <p>This is a dynamic homepage designed using CSS flexbox. Feel free to explore!</p>
            </div>
        </div>
    );
}


