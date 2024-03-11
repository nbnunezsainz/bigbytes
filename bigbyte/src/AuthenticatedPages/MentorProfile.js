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
      
              // Using the token to fetch internships
              const response = await fetch('http://localhost:3001/api/v1/mentor/GetMentor', payloadHeader);
              if (!response.ok) {
                throw new Error('Failed to fetch');
              }
      
              const data = await response.json();
              setMentor(data.user);
              console.log(data.user,"data");

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
          <Card style={{ width: '100%' , height: '600px'}}>
            <Container>
              <Row>
                <Col>
                  <Card.Title className='mt-4 mb-3'> {mentor.FirstName} {mentor.LastName} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Mentor</Card.Subtitle>
                  <Card.Subtitle className=''> {mentor.Company} </Card.Subtitle>
                  <Card.Link href={mentor.LinkedIn}> View LinkedIn </Card.Link>
                  <Card.Text className='mt-5'> {mentor.Bio} </Card.Text>
                </Col>
                <Col>
                  <Button>Edit</Button>
                </Col>
              </Row>
            </Container>
          </Card>
            {/* <div className='mt-3'>
                <h1>{mentor.FirstName}</h1>
                <h2>{mentor.LastName}</h2>
                <h3>Mentor</h3>
                <h3>{mentor.Company}</h3>
                <h3>{mentor.Linkedin}</h3>
            </div>
            <div className='mb-2'>
                <p>{mentor.Bio}</p>
            </div> */}
        </div>
        </>
    );
};

export default MentProfile;