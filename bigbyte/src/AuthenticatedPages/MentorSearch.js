import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import { Form, FormControl } from 'react-bootstrap';

const MentorSearch = () => {
  const [Mentors, setMentors] = useState([]); // State to store mentor data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [allCompanies, setAllCompanies] = useState(new Set());
  const [allIndustries, setAllIndustries] = useState(new Set());
  const [filterCompany, setFilterCompany] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');




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

      // Using the token to fetch mentors
      const response = await fetch('http://localhost:3001/api/v1/mentor/GetAllMentors', payloadHeader);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      console.log("mentor data: ");
      console.log(data.mentorData);

      setMentors(data.mentorData); // Assuming the response JSON structure matches our state

      let mentorCompany;
      //if data.mentorData exists, extract all locations
      if (data.mentorData) {
        mentorCompany = Object.values(data.mentorData);
        mentorCompany = [...new Set(mentorCompany.map(job => job.Company))];
        setAllCompanies(mentorCompany)
      }
      else {
        mentorCompany = new Set();
        setAllCompanies(mentorCompany)
      }

      let mentorIndustry;
      //if data.mentorData exists, extract all locations
      if (data.mentorData) {
        mentorIndustry = Object.values(data.mentorData);
        mentorIndustry = [...new Set(mentorIndustry.map(job => job.Industry))];
        setAllIndustries(mentorIndustry)
      }
      else {
        mentorIndustry = new Set();
        setAllIndustries(mentorIndustry)
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the fetch operation completes
    }
  };

  const resetFilters = async () => {
    fetchData();

  }
  //apply filters
  const applyFilters = async () => {
    setLoading(true); // Start loading

    try {
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      // Construct query parameters from state
      let queryParams = new URLSearchParams({
        Company: filterCompany,
        Industry: filterIndustry,
      }).toString();

      const payloadHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`http://localhost:3001/api/v1/mentor/QueryMentors?${queryParams}`, payloadHeader);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      console.log(data.mentorData)
      setMentors(data.mentorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };


  useEffect(() => {
    // Define the asynchronous function inside the useEffect hook
    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


  if (loading) {
    return <div>Loading...</div>; // Render a loading page or spinner here
  }

  return (
    <>
      <AuthNavbar />

      <h5>Filters</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            as="select" value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}>

            {/* Options for companies */}
            <option value="">Select Company</option>
            {Array.from(allCompanies).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Industry</Form.Label>
          <Form.Control
            as="select"
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
          >
            <option value="">Select Industry</option>
            {Array.from(allIndustries).map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {<Button variant="primary" onClick={applyFilters}>Apply Filters</Button>}
        {<Button variant="primary" onClick={resetFilters}> Reset Filters</Button>}
      </Form>

      {/*</Form>*/}
      <Row className="mt-5" style={{ paddingTop: "30px" }}>
        {Object.entries(Mentors).map(([mentorID, mentor]) => (
          <Col md={12}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Text><strong>Company:</strong> {mentor.Company}</Card.Text>
                <Card.Text><strong>Name:</strong> {mentor.FirstName} {mentor.LastName}</Card.Text>
                <Card.Text><strong>Bio:</strong> {mentor.Bio} </Card.Text>
                <Card.Text>
                  {/*<strong>LinkedIn:</strong>{" "}*/}
                  {/*<a href={`https://${mentor.LinkedIn}`} target="_blank" rel="noopener noreferrer">*/}
                  {/*  {mentor.LinkedIn}*/}
                  {/*</a>*/}
                </Card.Text>

                <a href={`https://${mentor.LinkedIn}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">Contact - LinkedIn</Button>
                </a>



              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MentorSearch;
