import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import { Form, FormControl } from 'react-bootstrap';


const JobDetail = () => {
  const [jobs, setJobs] = useState([]); // State to store internship data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered internship data
const [filterMajor, setFilterMajor] = useState('');
const [filterPay, setFilterPay] = useState('');
const [filterLocation, setFilterLocation] = useState('');

const applyFilters = async () => {
  setLoading(true); // Start loading

  try {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    // Construct query parameters from state
    let queryParams = new URLSearchParams({
      major: filterMajor,
      pay: filterPay,
      location: filterLocation
    }).toString();

    const payloadHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`http://localhost:3001/api/v1/internship/GetFilteredInternships?${queryParams}`, payloadHeader);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    setJobs(data.internshipData);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false); // Stop loading regardless of outcome
  }
};





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
        const response = await fetch('http://localhost:3001/api/v1/internship/GetAllInternships', payloadHeader);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        setJobs(data.internshipData); // Assuming the response JSON structure matches our state
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
      <AuthNavbar />
      <Container fluid className="mt-5">
        <Row>
          <Col md={3}>
            {/* Filter Section */}
            <h5>Filters</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter major"
                  value={filterMajor}
                  onChange={(e) => setFilterMajor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Pay</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter pay"
                  value={filterPay}
                  onChange={(e) => setFilterPay(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                />
              </Form.Group>
              { <Button variant="primary" onClick={applyFilters}>Apply Filters</Button> }
            </Form>
          </Col>
          <Col md={9}>
            {/* Job Listing Section */}
            <Row>
              {jobs.map((job, index) => (
                <Col md={12} key={index}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text><strong>Company:</strong> {job.Company}</Card.Text>
                      <Card.Text><strong>Date Posted:</strong> {job.datePosted}</Card.Text>
                      <Card.Text>{job.Description}</Card.Text>
                      <Button variant="primary">Apply</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default JobDetail;
