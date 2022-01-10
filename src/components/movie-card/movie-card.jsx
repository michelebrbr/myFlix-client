import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {

  render() { 
    const { movie, onMovieClick, addFavorite } = this.props;

    return (
      <Card border="dark" className="mb-2">
        <Card.Img variant="top" src={movie.imagePath} className="cardImg"/>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Button style={{ color:"#808080"}} onClick={() => onMovieClick(movie)} variant="link">View details</Button>
          <Button onClick={() => addFavorite(movie)}>Add to favorite</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func
};