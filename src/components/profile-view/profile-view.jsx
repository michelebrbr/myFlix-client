import React from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(){
    super();
    this.state = { 
      username: '',
      password: '',
      email: '',
      birthday: '',
      favMovies: []
      }

  }
  componentDidMount() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.get(`https://raftelapi.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favMovies: response.data.favoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  } 
    

  removeFavorite = (movie) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(this.props)
    axios.delete(`https://raftelapi.herokuapp.com/users/${user}/movies/${movie._id}`, 
    { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        let updatedMovies = this.state.favMovies.filter(m => {
          return m !== movie._id
        });
        this.setState({favMovies: updatedMovies})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  deleteAccount() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
        axios.delete( `https://raftelapi.herokuapp.com/users/${user}`,
          { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            alert(user + " has been deleted.");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};        
  }

  render() {

    let favMovies = this.props.movies.filter(movie => this.state.favMovies && this.state.favMovies.includes(movie._id));
    if (favMovies.length === 0){
      return <div style={{ width: '30%', margin: 'auto' }}>
        <p>username: {this.state.username}</p>
        <p>email: {this.state.email}</p>
        <p>birthday: {this.state.birthday}</p>
        <p>Favorites: There are no favorite movies</p>
      </div>
    }

    return(
      <div style={{ width: '30%', margin: 'auto' }}>
        <p>username: {this.state.username}</p>
        <p>email: {this.state.email}</p>
        <p>birthday: {this.state.birthday}</p>
        <p>Favorite movies:</p>

    

          {favMovies.map(movie => ( 
              <Card key={movie._id}>
                <Card.Img variant="top" className="imgCard" src={movie.imagePath} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button onClick={() => this.removeFavorite(movie)}>Remove from favorites</Button>

                </Card.Body>
              </Card> ))}
          <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteAccount()} >Delete Account</Button>
        
        </div>
    )
    
  }
}