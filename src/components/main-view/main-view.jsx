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
    }

    /*onLoggedIn(user) {
      this.setState({
        user
      });
    }*/

    onLoggedIn(authData) {
      console.log(authData);
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
              <Col xl={3} lg={4} md={6} sm={12} xs={12} key={movie._id}>
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