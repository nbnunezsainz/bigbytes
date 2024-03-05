//this will hold the links to pages, need to check if student/mentor bc students should not be ble to create internships only view them

import React from 'react';
import '../Home.css';
import { Outlet, Link } from "react-router-dom";

function AuthNavbar() {
    return (
      <nav>
        <ul>
          <img
            src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
            style={{ width: "100px" }}
            alt="logo"
          />
  
          <li><a href="#">Home</a></li>
          {/* <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li> */}
          <li>
            <Link to="/Home">Home</Link>
            <Link to="/InternshipSearch">Internship Search</Link>
            <Link to="/Resume">Resume Tools</Link>
            <Link to="MentorList">Mentor List</Link>
            <Link to="/Logout">Logout</Link>
            
          </li>
  
        </ul>
      </nav>
    );
  
  } export default AuthNavbar;