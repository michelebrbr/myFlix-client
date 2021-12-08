import React from 'react';
import { propTypes } from 'prop-types';
import { Card } from 'react-bootstrap/card';
import { Button } from 'react-bootstrap/button';

import './director-view.scss'

export class DirectorView extends React.Component {
    render() {
        console.log("testing", this.props);
        const { director, onBackClick } = this.props;
    }
}