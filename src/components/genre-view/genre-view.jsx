import React from 'react';
import { Link } from "react-router-dom";

import './genre-view.scss'

export class GenreView extends React.Component {
    render(){
        console.log('gw props:',this.props);
        return(
            <div>
                <h1>Genre view:</h1>
                <Link to={`/`} className="mr-2">
                    <button>go back</button>
                </Link>
            </div>
        )
    }
}