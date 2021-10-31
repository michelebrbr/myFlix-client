import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
            { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
          ]
        }
    }

    render() {
        const { movies } = this.state;
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
            {movies.map(movie => <MovieCard />)}
          </div>
        );
    }

  render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  }
}

export default MainView;