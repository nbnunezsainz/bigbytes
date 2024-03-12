import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import "./MentorProfile.css"
import auth from "../fb.js";

const MentProfile = () => {
    const [loading, setLoading] = useState(false);
    const [mentor, setMentor] = useState([]);
    const [editFields, setEditFields] = useState(false);
    const [referals, setReferals] = useState([]);
    const [refStatus, setRefStatus] = useState([]);
    const [viewReferals, setViewReferals] = useState(false)

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

                const response = await fetch('http://localhost:3001/api/v1/mentor/GetMentor', payloadHeader);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                setMentor(data.user);
                console.log(mentor);

                //console.log(data.user)
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMentor({ ...mentor, [name]: value });
    };

    const CheckReferals = async () => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());

        const payloadHeader = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch('http://localhost:3001/api/v1/mentor/RequestedReferals', payloadHeader);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setReferals(data.notifications);
        console.log(referals, "referals");    // COMMENT
        setViewReferals(!viewReferals);
    };

    const handleDone = async() => {

      // ONCE THIS WORKS, COPY AND PASTE INTO USERPROFILE

      // move this line to the data.success check
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
                body: JSON.stringify(mentor)
            };

            const response = await fetch('http://localhost:3001/api/v1/mentor/UpdateMentor', payloadHeader);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            console.log(data)
            //setMentor(data.user);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
      

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleResume = async() => {
      // redirect to page with PDFViewer for Resume URL

    }

    const handleAccept = async() => {
      // set referal status to accepted
      setRefStatus("accept");

      // MAKE BACKEND REQUEST FOR REF STATUS = ACCEPT
    //   try {
    //     const user = auth.currentUser;
    //     const token = user && (await user.getIdToken());

    //     const payloadHeader = {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(referal.status)
    //     };

    //     const response = await fetch('http://localhost:3001/api/v1/mentor/UpdateRefStatus', payloadHeader);
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch');
    //     }

    //     const data = await response.json();
    //     console.log(data)
    //     //setMentor(data.user);
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // } finally {
    //     setLoading(false);
    // }
    }

    const handleDecline = async() => {
      // set referal status to declined
      setRefStatus("decline");

      // MAKE BACKEND REQUEST FOR REF STATUS = DECLINE
    //   try {
    //     const user = auth.currentUser;
    //     const token = user && (await user.getIdToken());

    //     const payloadHeader = {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(referal.status)
    //     };

    //     const response = await fetch('http://localhost:3001/api/v1/mentor/UpdateRefStatus', payloadHeader);
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch');
    //     }

    //     const data = await response.json();
    //     console.log(data)
    //     //setMentor(data.user);
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // } finally {
    //     setLoading(false);
    // }
    }

    return (
        <>
            <AuthNavbar />
            <div style={{ padding: "120px" }}>
                <Card style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Container style={{ flex: '1', display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                        {editFields ? (
                            <>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name="FirstName" value={mentor.FirstName} onChange={handleInputChange} className="me-2" />
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" name="LastName" value={mentor.LastName} onChange={handleInputChange} className="me-2" />
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" name="Company" value={mentor.Company} onChange={handleInputChange} className="me-2" />
                                <Form.Label>LinkedIn</Form.Label>
                                <Form.Control type="text" name="LinkedIn" value={mentor.LinkedIn} onChange={handleInputChange} className="me-2" />
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="text" name="Bio" value={mentor.Bio} onChange={handleInputChange} className="me-2" />
                                <Button onClick={handleDone} className='mt-4'>Done</Button>
                            </>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <h1 className='mt-4 mb-2' style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            color: '#333'
                                        }}>{mentor.FirstName} {mentor.LastName}</h1>
                                        <h5 className="mb-1" style={{color: '#666'}}>Mentor</h5>
                                        <h6 className='' style={{color: '#888'}}>{mentor.Company}</h6>
                                        <a href={mentor.LinkedIn} target="_blank"
                                           rel="noopener noreferrer" style={{color: '#007bff', textDecoration: 'none'}}>View LinkedIn</a>
                                            <p className='mt-4' style={{
                                                fontSize: '16px',
                                                lineHeight: '1.5',
                                                color: '#555'
                                            }}>{mentor.Bio}</p>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 'auto' }}>
                                    <Col className="d-flex justify-content-end">
                                        <Button onClick={() => setEditFields(true)} className='mt-4 me-4' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Edit</Button>
                                        { (!viewReferals) ? (
                                          <Button onClick={CheckReferals} className='mt-4' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Show Referrals</Button>
                                        ) : (
                                          <Button onClick={CheckReferals} className='mt-4' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px' }}>Hide Referrals</Button>
                                        )}
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Container>
                </Card>
                
                <div>
                  {viewReferals && (
                    referals.length > 0 ? (
                        referals.map((referal, index) => (
                          <Row key={index} className='mt-4'>
                            <Card key={index}>
                                <Card.Title style={{marginTop: "20px"}}>Position: {referal.InternshipTitle}</Card.Title>
                                <Card.Text>
                                  Applicant Bio: {referal.studentBio}
                                </Card.Text>
                                <Row key={index} className='mb-3'>
                                  <Col key={index}>
                                    <Button className="resume-btn" onClick={handleResume}> View Resume </Button>
                                  </Col>
                                  <Col key={index+1}>
                                    <Button className='accept-btn' onClick={handleAccept}> Accept </Button>
                                  </Col>
                                  <Col key={index+2}>
                                    <Button className='decline-btn' onClick={handleDecline}> Decline </Button>
                                  </Col>
                                </Row>
                            </Card>
                          </Row>
                        ))
                    ) : (
                        <h3>Loading referrals or no referrals currently</h3>
                    )
                  )}
                </div>

            </div>
        </>
    );
};

export default MentProfile;

