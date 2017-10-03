import React, { Component } from 'react';
import {Link} from 'react-router';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }
    render() {
        return (
            <div>
                <Link to="/register">Sign Up</Link>
                <br></br>
                <Link to="/login">Login</Link>
                <p></p>
                <h1>Welcome to my homepage</h1>
            </div>
        )
    }
}