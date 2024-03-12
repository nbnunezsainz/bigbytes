import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Card, Button} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js"


const UserProfile = () => {
  const [User, setUser] = useState([]); // State to store student information
  const [loading, setLoading] = useState(true); // State to manage loading status
  
  const CheckReferals = async( ) =>
  {
    const user = auth.currentUser;
            const token = user && (await user.getIdToken());
    
            const payloadHeader = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
          const response = await fetch('http://localhost:3001/api/v1/user/ReferalStatus', payloadHeader)
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          
            const data = await response.json();

            console.log(data, "dataa");
    

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
  
        const response = await fetch('http://localhost:3001/api/v1/user/GetUser', payloadHeader);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
        console.log(data,"data");
        setUser(data.user); // Assuming the response JSON structure matches our state
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

  return (
    <>
    <AuthNavbar />
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>{User.FirstName} {User.LastName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{User.Major}</Card.Subtitle>
              <Card.Text>
                {User.Year}<br/>
                <a href={User.linkedIn}>LinkedIn</a>
              </Card.Text>
              <Button variant="primary">View Resume</Button>
              <Card.Text className="mt-3">
                {User.Bio}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <button onClick ={CheckReferals}> Referal Status</button>
    </Container>
    </>
    
  );
};


export default UserProfile;
