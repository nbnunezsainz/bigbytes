import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';

const JobDetail = () => {
  const [jobs, setJobs] = useState([]); // State to store internship data
  const [loading, setLoading] = useState(true); // State to manage loading status


  useEffect(() => {
    // Fetch data about internships
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/internship/QueryInternships'); // Replace 'YOUR_API_ENDPOINT' with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setJobs(data.internshipData); // Assuming the response JSON structure matches our state
        console.log(jobs,"jons");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch operation completes
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Render a loading page or spinner here
  }

  return (
    <Container>
      <AuthNavbar />
      <Row className="mt-5">
        {jobs.map((job) => (
          <Col md={12} >
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
    </Container>
  );
};

export default JobDetail;
