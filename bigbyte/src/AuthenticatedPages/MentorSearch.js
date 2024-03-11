// change to use mentor searching, currently same as internship searching

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import { Form, FormControl } from 'react-bootstrap';

const MentorSearch = () => {
  const [Mentors, setMentors] = useState([]); // State to store internship data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [allCompanies, setAllCompanies] = useState(new Set());
  
  useEffect(() => {
    // Define the asynchronous function inside the useEffect hook
    
    const fetchData = async () => {
     
      try {
        // Fetching the auth token
        const user = auth.currentUser ;
        const token = user && (await user.getIdToken());
  
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Using the token to fetch internships
        const response = await fetch('http://localhost:3001/api/v1/mentor/GetAllMentors', payloadHeader);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();

        console.log("mentor data: ");
        console.log(data.mentorData);

        setMentors(data.mentorData); // Assuming the response JSON structure matches our state

        let mentorCompany;
        //if data.internshipData exists, extract all locations
        if (data.mentorData) {
          mentorCompany = Object.values(data.mentorData);
          mentorCompany = [...new Set(mentorCompany.map(job => job.Company))];
          setAllCompanies(mentorCompany)
        }
        else {
          mentorCompany = new Set();
          setAllCompanies(mentorCompany)
        }


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
        <AuthNavbar/>

        <h5>Filters</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
                as="select">

              {/* Options for companies */}
              <option value="">Select Company</option>
              {Array.from(allCompanies).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
              ))}
            </Form.Control>

          </Form.Group>
          {<Button variant="primary">Apply Filters</Button>}
        </Form>


        {/*</Form>*/}
        <Row className="mt-5" style={{paddingTop: "30px"}}>
          {Mentors.map((Mentor) => (
              <Col md={12}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{Mentor.title}</Card.Title>
                    <Card.Text><strong>Company:</strong> {Mentor.Company}</Card.Text>
                    <Card.Text><strong>Name:</strong> {Mentor.FirstName} {Mentor.LastName}</Card.Text>
                    <Card.Text><strong>Bio:</strong> {Mentor.Bio} </Card.Text>
                    <Card.Text>
                      <strong>LinkedIn:</strong>{" "}
                      <a href={`https://${Mentor.LinkedIn}`} target="_blank" rel="noopener noreferrer">
                        {Mentor.LinkedIn}
                      </a>
                    </Card.Text>
                    <Card.Text><strong>Date Posted:</strong> {Mentor.datePosted}</Card.Text>
                    <Card.Text>{Mentor.Description}</Card.Text>
                    <Button variant="primary">Apply</Button>
                  </Card.Body>
                </Card>
              </Col>
          ))}
        </Row>
      </>
  );
};

export default MentorSearch;
