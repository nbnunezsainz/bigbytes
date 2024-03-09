import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";


const UserProfile = () => {
  const [User, setUser] = useState([]); // State to store student information
  const [loading, setLoading] = useState(true); // State to manage loading status
  
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
  
        const response = await fetch('http://localhost:3001/api/v1/user/GetUser', payloadHeader);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
        console.log(data,"data");
        setUser(data.userData); // Assuming the response JSON structure matches our state
        console.log(User);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Render a loading page or spinner here
  }
  
  const studentProfile =  {
    name: "Name",
    role: "Student",
    currentYear: "Current Year in College",
    college: "College/University",
    linkedIn: "LinkedIn Profile URL",
    aboutMe: "Place your bio here for Mentos to get to know you!"
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>{studentProfile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{studentProfile.role}</Card.Subtitle>
              <Card.Text>
                {studentProfile.currentYear}<br/>
                {studentProfile.college}<br/>
                <a href={studentProfile.linkedIn}>LinkedIn</a>
              </Card.Text>
              <Button variant="primary">View Resume</Button>
              <Card.Text className="mt-3">
                {studentProfile.aboutMe}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default UserProfile;


