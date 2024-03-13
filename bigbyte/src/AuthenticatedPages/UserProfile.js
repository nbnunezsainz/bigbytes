import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { Card, Button, Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import "../Styling/UserProfile.css";
import auth from "../fb.js"


const UserProfile = () => {
  const [User, setUser] = useState([]); // State to store student information
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [notifications, setNotifications] = useState([]);
  const [viewReferrals, setReferrals] = useState(false);
  const [editFields, setEditFields] = useState(false);
  const [resume, setResume] = useState("");


  const CheckReferals = async () => {
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
      console.log(data.notifications, "notfiy me")
      setNotifications(data.notifications);
    } else {
      console.error("Failed.");
    }

    console.log(notifications, "...notifications");
    // console.log(data, "dataa");
    setReferrals(!viewReferrals);
  };

  const handleResume = () => {
    // const resumeUrl = referals.notifications[index].data.Resume;
     window.open(resume, '_blank');
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const handleEditFields = async () => {

    setEditFields(false);

    // MAKE BACKEND REQUEST
    try {
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      const payloadHeader = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(User)
      };


      const response = await fetch('http://localhost:3001/api/v1/user/UpdateUser', payloadHeader);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setUser(data.userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }


  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const User = auth.currentUser;
        const token = User && (await User.getIdToken());

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch('http://localhost:3001/api/v1/User/GetUser', payloadHeader);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setUser(data.user); // Assuming the response JSON structure matches our state
        setResume(data.URL);
        console.log(data,"meep");
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
                {editFields ? (
                  <>
                    {/* Editable fields */}
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="FirstName" value={User.FirstName} onChange={handleInputChange} className="me-2" />
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="LastName" value={User.LastName} onChange={handleInputChange} className="me-2" />
                    <Form.Label>Major</Form.Label>
                    <Form.Control type="text" name="Major" value={User.Major} onChange={handleInputChange} className="me-2" />
                    <Form.Label>Graduation year</Form.Label>
                    <Form.Control type="text" name="GradYear" value={User.GradYear} onChange={handleInputChange} className="me-2" />
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="text" name="Bio" value={User.Bio} onChange={handleInputChange} className="me-2" />
                    <Form.Label>LinkedIn</Form.Label>
                    <Form.Control type="text" name="LinkedIn" value={User.LinkedIn} onChange={handleInputChange} className="me-2" />

                    <Button onClick={handleEditFields} className='mt-4'>Done</Button>
                  </>
                ) : (
                  <>
                    {/* Display-only fields */}
                    <Card.Title>{User.FirstName} {User.LastName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{User.Major}</Card.Subtitle>
                    <Card.Text>
                      {User.GradYear}<br />
                      <a href={User.linkedIn}>LinkedIn</a>
                    </Card.Text>
                    <Button variant="primary" onClick ={handleResume}>View Resume</Button>
                    <Card.Text className="mt-3">
                      {User.Bio}
                    </Card.Text>
                    <Row style={{ marginTop: 'auto' }}>
                      <Col className="d-flex justify-content-end">
                        <Button onClick={CheckReferals}> Referral Status</Button>
                        <Button onClick={() => setEditFields(true)} className='mt-4 me-4' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Edit</Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
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