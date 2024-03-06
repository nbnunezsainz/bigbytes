//this will hold the links to pages, need to check if student/mentor bc students should not be ble to create internships only view them
import React from 'react';
import { Outlet, Link } from "react-router-dom";

function AuthNavbar() {
    return (
      <nav className='fixed-top'>
        <ul>
          <img
            src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
            style={{ width: "100px" }}
            alt="logo"
          />
  
          <li>
            {/* <Link to="/Home">Home</Link> */}
            <Link to="/Internships">Internships</Link>
            <Link to="/Resume">Upload Resume</Link>
            <Link to="/ResumeReviwer">Resume Reviewer</Link>
            <Link to="/MentorList">Mentors</Link>
            <Link to="/Home">Logout</Link>
          </li>
  
        </ul>
      </nav>
    );
  
} export default AuthNavbar;