import React from 'react';
import { Link } from "react-router-dom";


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view" style={{ width: '25%', margin: 'auto' }}>
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title:<br></br></span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label"><br></br>Description:<br></br> </span>
          <span className="value">{movie.description}</span>
        </div>
        <Link to={`/director`} className="mr-2">
          <button>Director</button><br></br>
        </Link>
        <Link to={`/genre`} className="mr-2">
          <button>Genre</button><br></br>
        </Link>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}