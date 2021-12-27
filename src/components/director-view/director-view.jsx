import React from 'react';
import { Link } from "react-router-dom";

import './director-view.scss'

export class DirectorView extends React.Component {
    render(){
        const { directorObject } = this.props;
        console.log(directorObject);
        

        return(
            <div className="director-view" style={{ width: '25%', margin: 'auto' }}>
                <div className="director-name">
                    <span className="label">Name: <br></br></span>
                    <span className="value">{directorObject.name}</span>
                </div>
                <div className="director-bio">
                    <span className="label"><br></br>Biography: <br></br></span>
                    <span className="value">{directorObject.bio}</span>
                </div>
                <div className="director-year">
                    <span className="label"><br></br>Birth Year: <br></br></span>
                    <span className="value">{directorObject.birth_year}</span>
                </div>
                <Link to={`/`} className="mr-2">
                    <button>go back</button>
                </Link>
            </div>
              
        )
    }
}


