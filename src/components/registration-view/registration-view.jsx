/*import React, { useState } from 'react';
import { Button, Form, Container, Col, Row, CardGroup, Card } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <CardGroup>
              <Card>
                <Card.Header>Welcome! Please Register</Card.Header>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Card>
            </CardGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}*/