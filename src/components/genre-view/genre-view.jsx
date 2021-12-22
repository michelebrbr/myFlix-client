import React from 'react';
import { Link } from "react-router-dom";


import './genre-view.scss'

export class GenreView extends React.Component {
    render(){
        console.log('gw props:',this.props);
        return(
            <div>
                <p>Genre view:</p>
                <Link to={`/`} className="mr-2">
                    <button>Home</button>
                </Link>
            </div>
        )
    }
}