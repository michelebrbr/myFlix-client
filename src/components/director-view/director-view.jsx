import React from 'react';
import { Link } from "react-router-dom";

import './director-view.scss'

export class DirectorView extends React.Component {

    render(){
        const { director } = this.props;
        console.log(director);

        return(
            <div>
                <h1>Director view:</h1>
                <div>{director.name}</div>
                
                <Link to={`/`} className="mr-2">
                    <button>go back</button>
                </Link>
            </div>
        )
    }
}