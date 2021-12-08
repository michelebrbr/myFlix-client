import React, { useState } from 'react';
import { Button, Form, Container, Col, Row, CardGroup, Card } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //mockup login

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };*/
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
              </Card>
            </CardGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
