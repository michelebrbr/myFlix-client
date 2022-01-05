import React from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import './profile-view.scss';




export class ProfileView extends React.Component {
  componentDidMount() {
    //const { userObject, movie } = this.props;
    //this.setState({ userObject });
    //console.log(this.props);
    //console.log(this.state);

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
        this.componentDidMount();
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
            localStorage.removeItem('userObject');
            window.location.pathname = "/";
          })
          .catch(function (error) {
              console.log(error);
          })};        
  }

  render() {
    
    const { userObject, favMovies } = this.props;
    if (favMovies.length === 0){
      return <div style={{ width: '30%', margin: 'auto' }}>
        <p>username: {userObject.username}</p>
        <p>email: {userObject.email}</p>
        <p>birthday: {userObject.birthday}</p>
        <p>favorites: There are no favorite movies</p>
      </div>
    }

    return(
      <div style={{ width: '30%', margin: 'auto' }}>
        <p>username: {userObject.username}</p>
        <p>email: {userObject.email}</p>
        <p>birthday: {userObject.birthday}</p>
        <p>favorites:</p>

    

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