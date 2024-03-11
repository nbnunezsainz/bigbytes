import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Card, Button} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js"

const MentProfile = () => {
    const [firstName, setFirstName] = useState([]);       // state to store mentor first name
    const [lastName, setLastName] = useState([]);           // state to store mentor last name
    const [company, setCompany] = useState([]);       // state to store mentor experience
    const [linkedin, setLinkedin] = useState([]);       // state to store mentor LinkedIn
    const [bio, setBio] = useState([]);               // state to store mentor bio
    const [loading, setLoading] = useState([]);

    const [mentor, setMentor] = useState([]);
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
      
              // // Using the token to fetch internships
              // const response = await fetch('http://localhost:3001/api/v1/mentor/GetMentor', payloadHeader);
              // if (!response.ok) {
              //   throw new Error('Failed to fetch');
              // }
      
              // const data = await response.json();
              // setMentor(data.user);
              // console.log(data.user,"data");
              const mentorResponsePromise = fetch('http://localhost:3001/api/v1/mentor/GetMentor', payloadHeader)
              .then(response => response.ok ? response.json() : null)
              .catch(error => null);
      
            const notificationsResponsePromise = fetch('http://localhost:3001/api/v1/mentor/RequestedReferals', payloadHeader)
              .then(response => response.ok ? response.json() : null)
              .catch(error => null);
      
            const [mentorData, notificationsData] = await Promise.race([
              mentorResponsePromise,
              notificationsResponsePromise
            ]);
      
            if (mentorData) {
              setMentor(mentorData.user);
              console.log(mentorData.user, "mentor data");
            }
      
            if (notificationsData) {
              // Handle notifications data
              console.log(notificationsData, "notifications data");
            }
      

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
    
    console.log(mentor);
    return (
        <>
        <AuthNavbar />
        <div style={{padding: "120px"}}>
          <Card style={{ width: '100%', height: '600px', display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Container style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
              <Row>
                <Col>
                  <h1 className='mt-4 mb-2' style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{mentor.FirstName} {mentor.LastName}</h1>
                  <h5 className="mb-1" style={{ color: '#666' }}>Mentor</h5>
                  <h6 className='' style={{ color: '#888' }}>{mentor.Company}</h6>
                  <a href={mentor.LinkedIn} style={{ color: '#007bff', textDecoration: 'none' }}>View LinkedIn</a>
                  <p className='mt-4' style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>{mentor.Bio}</p>
                </Col>
                </Row>
                <Row style={{ marginTop: 'auto' }}>
                  <Col className="d-flex justify-content-end">
                    <Button className='mt-4' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Edit</Button>
                  </Col>
                </Row>
            </Container>
          </Card>
        </div>
        </>
    );
};

export default MentProfile;