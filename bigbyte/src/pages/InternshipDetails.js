import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const JobDetail = () => {
  // Example job detail, replace with actual data
  const job = {
    title: "Job Title",
    id: "Job ID",
    company: "Company",
    datePosted: "Date Posted",
    description: "Job Description",
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <h2>{job.title}</h2>
          <p><strong>Job ID:</strong> {job.id}</p>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Date Posted:</strong> {job.datePosted}</p>
          <p>{job.description}</p>
          <Button variant="primary">Apply</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetail;
