import React from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(){
    super();
    this.state = { 
      username: null,
      password: null,
      email: null,
      birthday: null,
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

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    console.log(name, value)
  
    this.setState({[name]: value});
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://raftelapi.herokuapp.com/users/${username}`,
      {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        birthday: this.state.birthday
      },
      { headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          username: newUsername,
          password: newPassword,
          email: newEmail,
          birthday: newBirthday
        });
        localStorage.setItem('user', response.data.username);
        alert('Profile was updated');
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  /*setUsername(value) {
    this.state.username = value;
  }

  setPassword(value) {
    this.state.password = value;
  }

  setEmail(value) {
    this.state.email = value;
  }

  setBirthday(value) {
    this.state.birthday = value;
  }*/

  render() {

    let favMovies = this.props.movies.filter(movie => this.state.favMovies && this.state.favMovies.includes(movie._id));
    if (favMovies.length === 0){
      return <div style={{ width: '30%', margin: 'auto' }}>
        <h6>username: {this.state.username}</h6>
        <h6>email: {this.state.email}</h6>
        <h6>birthday: {this.state.birthday}</h6>
        <h6>Favorites: There are no favorite movies</h6>
        <div className="profileInfo">        
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <br></br>
            <h3>Edit profile:</h3>
          </div>
            <Form.Group>
              Username
              <Form.Control type='text' name="username" placeholder="New Username" onChange={this.handleChange} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="password" placeholder="New Password" onChange={this.handleChange} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="email" placeholder="New Email" onChange={this.handleChange} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="birthday" onChange={this.handleChange} required />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          <br></br>
          <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteAccount()} >Delete Account</Button>
          </div>
      </div>
      
    }

    return(
      <div style={{ width: '30%', margin: 'auto' }}>
        <h6>username: {this.state.username}</h6>
        <h6>email: {this.state.email}</h6>
        <h6>birthday: {this.state.birthday}</h6>
        <h6>Favorite movies:</h6>

          {favMovies.map(movie => ( 
              <Card key={movie._id}>
                <Card.Img variant="top" className="imgCard" src={movie.imagePath} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button variant="outline-danger" onClick={() => this.removeFavorite(movie)}>💔</Button>

                </Card.Body>
              </Card> ))}

          <div className="profileInfo">        
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
          <div>
            <br></br>
            <h3>Edit Profile:</h3>
          </div>
            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          </div>
          <br></br>
          <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteAccount()} >Delete Account</Button>
        
        </div>
    )
    
  }
}