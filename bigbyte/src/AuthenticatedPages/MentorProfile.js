import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js"

const MentProfile = () => {
    const [firstName, setFirstName] = useState([]);       // state to store mentor first name
    const [lastName, setLastName] = useState([]);           // state to store mentor last name
    const [company, setCompany] = useState([]);       // state to store mentor experience
    const [linkedin, setLinkedin] = useState([]);       // state to store mentor LinkedIn
    const [bio, setBio] = useState([]);               // state to store mentor bio
    const [loading, setLoading] = useState([]);
    useEffect(() => {
        // Define the asynchronous function inside the useEffect hook

        const fetchData = async () => {

            try {
              // Fetching the auth token
              const user = auth.currentUser;
              const token = user && (await user.getIdToken());
      
              const payloadHeader = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
      
              // Using the token to fetch internships
              const response = await fetch('http://localhost:3001/api/v1/mentor/GetMentor', payloadHeader);
              if (!response.ok) {
                throw new Error('Failed to fetch');
              }
      
              const data = await response.json();
              setFirstName(data.firstName);
              setLastName(data.lastName);
              setCompany(data.company);
              setLinkedin(data.linkedin);
              setBio(data.bio);

            //   set(data.internshipData); // Assuming the response JSON structure matches our state
            } catch (error) {
              console.error("Error fetching data:", error);
            } finally {
              setLoading(false); // Ensure loading is set to false after the fetch operation completes
            }
          };
      
          // Call the fetchData function
          fetchData();
        }, []); // Empty dependency array means this effect runs once on mount
      
      
    if (loading) {
        return <div>Loading...</div>; // Render a loading page or spinner here
    }
      
    return (
        <>
        <AuthNavbar />
        <div style={{padding: "120px"}}>
            <div className='mt-3'>
                <h1>{firstName}</h1>
                <h2>{lastName}</h2>
                <h3>Mentor</h3>
                <h3>{company}</h3>
                <h3>{linkedin}</h3>
            </div>
            <div className='mb-2'>
                <p>{bio}</p>
            </div>
        </div>
        </>
    );
};

export default MentProfile;