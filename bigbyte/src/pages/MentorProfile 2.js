import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const MentorProfileCard = () => {
  // Example mentor data, replace with actual data
  const mentor = {
    name: "Name",
    role: "Mentor",
    experience: "Experience",
    linkedIn: "LinkedIn",
    about: "About Me: ..."
  };

  return (
    <Card style={{ width: '18rem', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Card.Img variant="top" src="profile-placeholder.png" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto' }} />
      <Card.Body>
        <Card.Title>{mentor.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>{mentor.role}</ListGroup.Item>
          <ListGroup.Item>{mentor.experience}</ListGroup.Item>
          <ListGroup.Item>{mentor.linkedIn}</ListGroup.Item>
        </ListGroup>
        <Card.Text>
          {mentor.about}
        </Card.Text>
        <Button variant="primary" style={{ position: 'absolute', top: '20px', right: '20px' }}>Contact</Button>
      </Card.Body>
    </Card>
  );
};

export default MentorProfileCard;
