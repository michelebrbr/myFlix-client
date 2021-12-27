import React from 'react';
import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component {
    render(){
        const { genreObject } = this.props;
        console.log(genreObject);


        return(
            <div className="genre-view" style={{ width: '25%', margin: 'auto' }}>
                <div className="genre-name">
                    <span className="label">Name: <br></br></span>
                    <span className="value">{genreObject.name}</span>
                </div>
                <div className="genre-description">
                    <span className="label"><br></br>Description: <br></br></span>
                    <span className="value">{genreObject.description}</span>
                </div>
                <Link to={`/`} className="mr-2">
                    <button>go back</button>
                </Link>
        </div>
        )
    }
}