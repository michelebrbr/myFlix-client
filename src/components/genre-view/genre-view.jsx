import React from 'react';
import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component {
    render(){
        const { genre } = this.props
        console.log('gw props:',this.props);
        return(
            <div className="genre-view" style={{ width: '25%', margin: 'auto' }}>
            <div className="genre-name">
                <span className="label">Name: <br></br></span>
                <span className="value">{genre.name}</span>
            </div>
            <div className="genre-description">
                <span className="label"><br></br>Description: <br></br></span>
                <span className="value">{genre.description}</span>
            </div>
            <Link to={`/`} className="mr-2">
                <button>go back</button>
            </Link>
        </div>
        )
    }
}