import React, { useState } from 'react';
import { Button, Form, Container, Col, Row, CardGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://raftelapi.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('This username does not exist')
    });
  };

  return (
    <Container style={{ width: '30%', margin: 'auto' }}>
        <Row>
          <Col>
            <Form>
              <CardGroup>
                <Card >
                  <Card.Header>Welcome! Please Login</Card.Header>
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
                  <Card.Header>Not registered yet?</Card.Header>
                </Card>
              </CardGroup>
            </Form>
            <Link to="/register" className="mr-2">
              <button>Create an Account</button>
            </Link>
          </Col>
        </Row> 
    </Container>
  );
}
