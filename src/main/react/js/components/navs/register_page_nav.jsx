import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

export default class RegisterPageNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
          <div className="top-bar">
                <div className="top-bar-right">
                    <Link to="/"><button type="button" className="button">Home</button></Link>
                </div>
          </div>
        )
    }
}