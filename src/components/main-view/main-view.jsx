import React from 'react';
import axios from 'axios';
//import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }
  
  componentDidMount(){
    axios.get('https://raftelapi.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    /*render() {
      const { movies, selectedMovie, } = this.state;
  
  
      if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
    }*/

    /*render() {
      const { movies, selectedMovie, user } = this.state;
  
      // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          {//If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned}
          {selectedMovie
            ? 
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
           ))
          }
        </div>
      );
    }*/
    render() {
      const { movies, selectedMovie, user } = this.state;
  
      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details 
      are *passed as a prop to the LoginView*/
      if(!user) return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">
          <Navbar bg="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#home">MyFlix APP</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Profile</Nav.Link>
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
              <Col md={3} key={movie._id}>
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
    }
}

export default MainView;