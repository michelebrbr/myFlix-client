import React from 'react';

export class ProfileView extends React.Component {

  render() {
    console.log(this.props);
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