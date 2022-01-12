import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar, Row, Col, Button, Image } from 'react-bootstrap';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView} from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';



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

    addFavorite(movie){
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.post(`https://raftelapi.herokuapp.com/users/${user}/movies/${movie._id}`,{},
      { headers: { Authorization: `Bearer ${token}` } }
      ).then((response) => {
        alert("movie has been added to favorite");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    };  

    onLoggedIn(authData) {
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
    //let favMovies = userObject ? movies.filter(movie => this.state.favMovies && this.state.favMovies.includes(movie._id)) : [];
    //console.log("userObject", localStorage.getItem('userObject'));
    return (
      <Router>
        <Navbar expand="lg" className="mb-4">
          <Navbar.Brand className="ml-4">
            <Link to={'/'}>
              <Image src="https://i.imgur.com/ykYgWv5.png" alt="myFlix logo" className="d-inline-block align-top" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
              {user && (
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Link to={`/profile`} className="mr-2">
                        <Button varient="link">{user}'s profile</Button>
                    </Link>
                    <Link to={`/`} className="mr-2">
                      <Button onClick={() => this.onLoggedOut()} varient="link">Logout</Button>
                    </Link>
                </Navbar.Collapse>
              )}
        </Navbar>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
                if (!user) 
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
                    addFavorite = { this.addFavorite }
                     />
                </Col>
                ))
              }} />
          <Route exact path="/profile" render={() => {
            return <ProfileView 
            movies = { movies }/>
          }}/>
          <Route exact path="/director/:name" render={({match}) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <DirectorView 
            directorObject={movies.find((movie) => movie.director.name === match.params.name).director }
            />
          }}/>
          <Route path="/movie/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
                onBackClick={() => history.goBack()} />
              </Col>
            }} />
          <Route exact path="/genre/:name" render={({match}) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <GenreView 
            genreObject={movies.find((movie) => movie.genre.name === match.params.name).genre }
            />
          }}/>
          <Route exact path="/register" render={() => {
            return <RegistrationView/>
              }} />
          
        </Row>
      </Router>
    );
  }
}

export default MainView;