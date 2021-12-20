import React from 'react';
import axios from 'axios';
//import { RegistrationView } from '../registration-view/registration-view';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Nav, Container, Row, Col, Button, Image } from 'react-bootstrap';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userObject: null
    }
  }

  getMovies(token) {
    axios.get('https://raftelapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        userObject: localStorage.getItem('userObject')
      });
      this.getMovies(accessToken);
    }
  }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    } 

    /*onLoggedIn(user) {
      this.setState({
        user
      });
    }*/

    onLoggedIn(authData) {
      console.log(authData);
      console.log(authData.user);
      this.setState({
        user: authData.user.username,
        userObject: authData.user

      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.username);
      localStorage.setItem('userObject', authData.user);
      this.getMovies(authData.token);
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }
    

  render() {
    const { movies, selectedMovie, user, userObject } = this.state;
    console.log("user", userObject);

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Navbar expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link to={'/'}>
              <Image src="https://i.imgur.com/ykYgWv5.png" alt="myFlix logo" className="d-inline-block align-top" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
              {user && (
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Link to={`/profile`} className="mr-2">
                        <Button varient="link">Profile for {user}</Button>
                    </Link>
                    <Button onClick={() => this.onLoggedOut()} varient="link">Logout</Button>
                </Navbar.Collapse>
              )}
        </Navbar>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                return this.state.selectedMovie ? 
                <Col>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col> : movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }} 
              />
                  </Col>
                ))
              }} />
          <Route exact path="/profile" render={() => {
            return <ProfileView 
            userObject = {userObject} />
          }}/>
        </Row>
      </Router>
    );
  }
}

export default MainView;