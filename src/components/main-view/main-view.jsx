import React from 'react';
import axios from 'axios';
//import { RegistrationView } from '../registration-view/registration-view';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Nav, Container, Row, Col, Button, Image } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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
  
  /*componentDidMount(){
    axios.get('https://raftelapi.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }*/

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    } //commentato via per il 3.6

    /*onLoggedIn(user) {
      this.setState({
        user
      });
    }*/

    onLoggedIn(authData) {
      //console.log(authData);
      this.setState({
        user: authData.user.username
      });
    
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.username);
      this.getMovies(authData.token);
    }

    onLoggedOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.setState({
        user: null
      });
    }
    

    /*render() {
      const { movies, selectedMovie, user } = this.state;
  
      // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
      if(!user) return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      
  
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          <Navbar bg="dark" expand='md'>
            <Container>
            <button onClick={() => { this.onLoggedOut() }}>Logout</button>
              <Navbar.Brand href="#home" style={{ color:"#ffffff"}}>MyFlix APP</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home" style={{ color:"#ffffff", font:"icon"}}>Home</Nav.Link>
                  <Nav.Link href="#link" style={{ color:"#ffffff", font:"icon"}}>Profile</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map((movie) => (
              <Col lg='4' md='6' sm='12'  key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                  
                />
              </Col>
            ))        
          }
          </Row>
        </div>
      );
    }*/

    /*render() {
      const { movies, user } = this.state;
      return(
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
                                <Link to={`/users/${user.username}`} className="mr-2">
                                    <Button varient="link">Profile for {user.username}</Button>
                                </Link>
                                <Button onClick={() => this.onLoggedOut()} varient="link">Logout</Button>
                            </Navbar.Collapse>
                        )}

                </Navbar>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" element={LoginView}/>
          </Row>
        </Router>

      )
    
    }*/

    render() {
      const { movies, selectedMovie, user } = this.state;
  
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
                                <Link to={`/users/${user.username}`} className="mr-2">
                                    <Button varient="link">Profile for {user.username}</Button>
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
          </Row>
        </Router>
      );
    }
}

export default MainView;