import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';
import { Link } from "react-router-dom";


export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://raftelapi.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <div className="registration" style={{ width: '30%', margin: 'auto' }}> 
    <Form>
    <h1 className="form-title">Register</h1>
      <Form.Group controlId="registration-Username">
       <Form.Label>Username:</Form.Label>
       <Form.Control className="username" value={username} type="text" placeholder="Enter a new username" onChange={e => setUsername(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId="registration-Password">
       <Form.Label>Password:</Form.Label>
       <Form.Control className="password" value={password} type="text" placeholder="Set a password" onChange={e => setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId="registration-Email">
       <Form.Label>Email:</Form.Label>
       <Form.Control className="email" value={email} type="email" placeholder="Enter an email" onChange={e => setEmail(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group controlId="registration-Birthday">
       <Form.Label>Birthday:</Form.Label>
       <Form.Control className="birthday" value={birthday} type="date" placeholder="Enter your birthday" onChange={e => setBirthday(e.target.value)}></Form.Control>
      </Form.Group>
      <div className="buttons-registration">
      <Button variant="success link" className="registerBtn" type="submit" onClick={handleSubmit}>Register </Button>
      </div>
    </Form>
    <Link to="/" className="mr-2">
      <button>go to Login page</button>
    </Link>
  </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
};