import React from 'react';

export class ProfileView extends React.Component {
  componentDidMount() {
    const { userObject } = this.props;
    this.setState({ userObject });
    console.log(this.props);
    console.log(this.state);

  }

  
  
  render() {
    
    const { userObject } = this.props;
    return(
      <div>
        <p>username: {userObject.username}</p>
        <p>email: {userObject.email}</p>
        <p>birthday: {userObject.birthday}</p>
        <p>favorites: {userObject.favmovies}</p>
      </div>
    )
    
  }
}