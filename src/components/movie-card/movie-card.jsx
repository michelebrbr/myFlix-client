import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {

  render() { 
    const { movie, onMovieClick, addFavorite } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button style={{ color:"#808080"}} onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
    ImagePath: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func
};