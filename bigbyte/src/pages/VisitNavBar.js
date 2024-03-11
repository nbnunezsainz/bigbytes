import React from 'react';
import { Outlet, Link } from "react-router-dom";

/* the function navbar is able to provide access to pages and interconnect our website*/
const NavBar = () => {
    return (
      <nav className='fixed-top pt-3'>
        <ul>
          <img
            src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
            style={{ width: "100px" }}
            alt="logo"
          />
  
          <li><Link to="/Home">Home</Link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li>
            {/* <Link to="/InternShips">Internship Search</Link>
            <Link to="/Resume">Resume Tools</Link>
            <Link to="BackendTesting">Backend Testing</Link> */}
            <Link to="/Login">Login</Link>
            <Link to="/SignUp">Sign Up</Link>
            
          </li>
  
        </ul>
      </nav>
    );
  
  }

  export default NavBar;