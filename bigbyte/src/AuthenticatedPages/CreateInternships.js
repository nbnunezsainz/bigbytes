//only be viewed on a mentors page

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import '../Styling/CreateInternship.css';
import Confetti from 'react-dom-confetti';




const CreateInternship = () => {
    const [success,setSuccess]= useState(false);
  const [internshipData, setInternshipData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    pay: '',
    category: '',
    url: '',
    referralLimit: '',
     // Assuming this will come from authenticated user context or similar
});
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [showConfetti, setShowConfetti] = useState(false); // Want to add the js.confetti so when someone submits a posting, they are rewarded for it 
    //const [successMessage, setSuccessMessage] = useState('');

      const SubmitInternship = async () => {
  
        try {
          // Fetching the auth token
          const user = auth.currentUser;
          const token = user && (await user.getIdToken());

          console.log(user);
  
          const payloadHeader = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(internshipData), // Include the internship data in the request body
          };
  
          // Using the token to fetch internships
          const response = await fetch('http://localhost:3001/api/v1/internship/AddInternship', payloadHeader);
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
  
          const data = await response.json();
          setSuccess(data.success);
          setShowConfetti(data.success);
          console.log(success);
        } catch (error) {
        } finally {
          setLoading(false); // Ensure loading is set to false after the fetch operation completes
        }
      };
  
        const handleChange = (e) => {
            setInternshipData({ ...internshipData, [e.target.name]: e.target.value });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            // Add your submit logic here, e.g., sending internshipData to your backend API
            // setShowConfetti(true);
            // setSuccessMessage('Successfully created internship!');

        };
    
        return (
          
            <div>
                <AuthNavbar />
                <header className="container">
                <div className="background-layer-ci"></div>
             <div className="title-mentor">
             <h1 className="text-in-container, h1">Create an Internship</h1>
             <p className="text-in-container, p">As a mentor, you are able to provide infinite possibilities to students
             who otherwise wouldn't have had the chance. Here, at Refer a Bruin, we cannot thank you enough for providing a hand to students, yearning to find a place at your company. </p>
                  </div>
                </header>
                <Confetti active={showConfetti} />
                <Container className="create-internship-container" style={{marginTop: '-220px'}}>
                <Confetti active={showConfetti} />
                    <Row className="justify-content-center">
                        <Col sm ={12}>
                            <div className="create-internship-content">
                                {/* <h2>Create New Internship</h2> */}
                                {/* Form starts here */}
                                <Form onSubmit={handleSubmit} className="internship-form">
                                    <Form.Group className="mb-3" controlId="formTitle">
                                    <Confetti active={showConfetti} />
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={internshipData.title}
                                            onChange={handleChange}
                                            placeholder="Enter internship title"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCompany">
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="company"
                                            value={internshipData.company}
                                            onChange={handleChange}
                                            placeholder="Enter company name"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={internshipData.description}
                                            onChange={handleChange}
                                            placeholder="Enter internship description"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            value={internshipData.location}
                                            onChange={handleChange}
                                            placeholder="Enter location"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formPay">
                                        <Form.Label>Pay (optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="pay"
                                            value={internshipData.pay}
                                            onChange={handleChange}
                                            placeholder="Enter pay"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formCategory">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="category"
                                            value={internshipData.category}
                                            onChange={handleChange}
                                            placeholder="Enter category (e.g., Engineering, Marketing)"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formURL">
                                        <Form.Label>Application URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="url"
                                            value={internshipData.url}
                                            onChange={handleChange}
                                            placeholder="Enter application URL"
                                        />
                                    </Form.Group>
                                    <Confetti active={showConfetti} />
                                    <Form.Group className="mb-3" controlId="formReferralLimit">
                                        <Form.Label>Referral Limit (optional)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="referralLimit"
                                            value={internshipData.referralLimit}
                                            onChange={handleChange}
                                            placeholder="Enter referral limit"
                                        />
                                    </Form.Group>
                                    {/* Form ends here */}
                                    <Button onClick= {SubmitInternship}variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
                 {/* Once submitted, call active showConfetti */}
               
                <Confetti active={showConfetti} />

                {/*{successMessage && (*/}
                {/*    <div className="success-message">*/}
                {/*        <p>{successMessage}</p>*/}
                {/*    </div>*/}
                {/*)}*/}
                 
            </div>
        );
    };
    
    export default CreateInternship;
    