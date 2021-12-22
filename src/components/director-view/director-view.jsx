import React from 'react';
import { Link } from "react-router-dom";

import './director-view.scss'

export class DirectorView extends React.Component {
    render(){
        console.log('dw props:',this.props);
        return(
            <div>
                <p>Director view:</p>
                <Link to={`/`} className="mr-2">
                    <button>Home</button>
                </Link>
            </div>
        )
    }
}