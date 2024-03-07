import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const StudentProfile = () => {
  // Example student profile data, replace with actual data
  const studentProfile = {
    name: "Name",
    role: "Student",
    currentYear: "Current Year in College",
    college: "College/University",
    linkedIn: "LinkedIn Profile URL",
    aboutMe: "About me content goes here..."
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12}>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>{studentProfile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{studentProfile.role}</Card.Subtitle>
              <Card.Text>
                {studentProfile.currentYear}<br/>
                {studentProfile.college}<br/>
                <a href={studentProfile.linkedIn}>LinkedIn</a>
              </Card.Text>
              <Button variant="primary">View Resume</Button>
              <Card.Text className="mt-3">
                {studentProfile.aboutMe}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProfile;
