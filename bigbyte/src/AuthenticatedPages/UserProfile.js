import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import {Card, Button} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import "./UserProfile.css"
import auth from "../fb.js"


const UserProfile = () => {
  const [User, setUser] = useState([]); // State to store student information
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [notifications, setNotifications] = useState([]);
  const [viewReferrals, setReferrals] = useState(false);

  
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

            if (data.success) {
              setNotifications(data.notifications);
            } else {
              console.error("Failed.");
            }

            console.log(notifications, "...notifications");
           // console.log(data, "dataa");
          setReferrals(!viewReferrals);
    

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
            <Card style={{width: '18rem', margin: 'auto'}}>
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
                <button onClick={CheckReferals}> Referral Status</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/*<Button className="resume-btn"> View Resume </Button>*/}
        {/*<button onClick ={CheckReferals}> Referral Status</button>*/}
        {/*{notifications.length > 0 && (*/}
        {/*    <div>*/}
        {/*      <h3>Referral Notifications:</h3>*/}
        {/*      <ul>*/}
        {/*        {notifications.map((notification, index) => (*/}
        {/*            <li key={index}>*/}
        {/*              <strong>Internship*/}
        {/*                Title:</strong> {notification.InternshipTitle}, <strong>Status:</strong> {notification.status}*/}
        {/*            </li>*/}
        {/*        ))}*/}
        {/*      </ul>*/}
        {/*    </div>*/}
        {/*)}*/}

        <div>
          {viewReferrals && (
              notifications.length > 0 ? (
                  notifications.map((referral, index) => (
                      <Row key={index} className='mt-4'>
                        <Card>
                          <Card.Title style={{ marginTop: "20px" }}>Position: {referral.InternshipTitle}</Card.Title>
                          <Card.Text>
                            <p>Company: {referral.Company}</p>
                            <p>Status: {referral.status}</p>
                          </Card.Text>
                          <Row className='mb-3'>
                            <Col>
                              {/*<Button className="resume-btn" onClick={() => handleViewResume(referral.resumeUrl)}>View Resume</Button>*/}
                            </Col>
                            <Col>
                              {/*<Button className='accept-btn' onClick={() => handleAccept(referral.id)}>Accept</Button>*/}
                            </Col>
                            <Col>
                              {/*<Button className='decline-btn' onClick={() => handleDecline(referral.id)}>Decline</Button>*/}
                            </Col>
                          </Row>
                        </Card>
                      </Row>
                  ))
              ) : (
                  <>
                    <p>Loading referrals or no referrals currently</p>
                  </>
              )
          )}

        </div>

      </Container>
    </>

  );
};


export default UserProfile;
