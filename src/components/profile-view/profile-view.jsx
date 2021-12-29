import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';



export class ProfileView extends React.Component {
  componentDidMount() {
    const { userObject } = this.props;
    this.setState({ userObject });
    console.log(this.props);
    console.log(this.state);

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
    
    const { userObject } = this.props;
    return(
      <div>
        <p>username: {userObject.username}</p>
        <p>email: {userObject.email}</p>
        <p>birthday: {userObject.birthday}</p>
        <p>favorites: {userObject.favoriteMovies}</p>
        <Link to={`/`} className="mr-2">
          <button>go back</button>
        </Link>
        <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteAccount()} >Delete Account</Button>
      </div>
    )
    
  }
}