//this will hold the links to pages, need to check if student/mentor bc students should not be ble to create internships only view them
import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { Outlet, Link } from "react-router-dom";
import auth from "../fb.js"
 import '../Styling/AuthNavBar.css';
 import { useNavigate} from 'react-router-dom';
import { useAuth } from ".././AuthContext.js";


function AuthNavbar() {
    const [userStatus, setUserStatus] = useState(null);
    const { logout} = useAuth();
    const navigate = useNavigate();

    const logoutUser = () =>
    {
      logout();
      navigate("/");

    }
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
          <img src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png" alt="logo" style ={{"width":"100px"}}/>
          <ul className="nav-links">
              <li><Link to="/Internships">Internships</Link></li>
              <li><Link to="/ResumeReviwer">Resume Reviewer</Link></li>
              {/* Only show Create Internships for mentors in the center */}
              {!userStatus && <li><Link to="/CreateInternship">Create Internship</Link></li>}
          </ul>
          {userStatus === null ? (
              <div className="right-links">Loading user info...</div>
          ) : (
              <div className="right-links">
                   <Link to="/MentorProfile">My Profile</Link>
                  {userStatus ? (
                      <>
                          <Link to="/UserProfile">My Profile</Link>
                          <Link to="/Resume">Upload Resume</Link>
                          <Link to="/MentorSearch">Mentors</Link>
                      </>
                  ) : (
                      <>
                         
                          <Button onClick={logoutUser}>Logout</Button>
                      </>
                  )}
              </div>
          )}
      </nav>
  );
};

export default AuthNavbar;