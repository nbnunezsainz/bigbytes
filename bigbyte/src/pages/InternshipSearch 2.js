import React from 'react';
import {Container, Row, Col, Button, Form, Card} from 'react-bootstrap';

const InternshipList = () => {
    // Dummy data for the list of internships
    const internships = [
        {id: 1, title: "Job Title", company: "Company Name", description: "Brief Description", datePosted: "MM/DD/YYYY"},
        {id: 2, title: "Job Title", company: "Company Name", description: "Brief Description", datePosted: "MM/DD/YYYY"},
        {id: 3, title: "Job Title", company: "Company Name", description: "Brief Description", datePosted: "MM/DD/YYYY"}
    ];

    return (
        <Container>
          <Row className="mb-4">
            <Col><h2>Internships</h2></Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Button variant="secondary">Company</Button>
              <Button variant="secondary" className="ms-2">Targeted Major</Button>
            </Col>
            <Col md={8}>
              <Form.Control type="text" placeholder="Search by URL or Job Title" />
            </Col>
          </Row>
          {internships.map((internship) => (
            <Card key={internship.id} className="mb-3">
              <Card.Body>
                <Card.Title>{internship.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{internship.company}</Card.Subtitle>
                <Card.Text>{internship.description}</Card.Text>
                <Button variant="primary">Learn More</Button>
                <Card.Text className="mt-2">{internship.datePosted}</Card.Text>
                <Button variant="info">Apply</Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
    );
};

export default InternshipList;