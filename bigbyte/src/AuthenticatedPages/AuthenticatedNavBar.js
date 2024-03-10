//this will hold the links to pages, need to check if student/mentor bc students should not be ble to create internships only view them
import React, {useState,useEffect} from 'react';
import { Outlet, Link } from "react-router-dom";
import auth from "../fb.js"

function AuthNavbar() {
    const [userStatus, setUserStatus] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = auth.currentUser;
          const token = user && (await user.getIdToken());
    
          const payloadHeader = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await fetch('http://localhost:3001/api/v1/user/GetUserType', payloadHeader);
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
    
          const data = await response.json();
          if(data.user === 'mentor')
          {
            setUserStatus(false);
          }
          else{
            setUserStatus(true);
          }
          
          
         
        } catch (error) {
          console.error("Error fetching data:", error);
        } 
      };
    
      fetchData();
    }, []);
    

    return (
      <nav className='fixed-top'>
        <ul>
          <img
            src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
            style={{ width: "100px" }}
            alt="logo"
          />
  
          <li> 
            
            <Link to="/Internships">Internships</Link>
            <Link to="/ResumeReviwer">Resume Reviewer</Link> 
            <Link to="/Home">Logout</Link>

            {userStatus === null ? (
                // Render nothing or a loader while user status is unknown
                <div>Loading user info...</div>
            ) : userStatus ? (
                // pages only a student can view
                <li>
                <Link to="/UserProfile">My Profile</Link>
                <Link to="/Resume">Upload Resume</Link> 
                <Link to="/MentorSearch">Mentors</Link>
                </li>
            ) : (
                // User is a mentor and they can view these pages
                <li>
                <Link to="/MentorProfile">My Profile</Link>
                </li>
            )}
          </li>
  
        </ul>
      </nav>
    );
  
} export default AuthNavbar;