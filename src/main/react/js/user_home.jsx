import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    onLogout(){
        localStorage.removeItem('creds');
        localStorage.removeItem('user');
        browserHistory.push('/');
    }
    componentWillMount() {
        fetch('/api/userhome', {
            headers: {
                Auth: localStorage.getItem('creds'),
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
        }).then((response) => response.json())
        .then((results) => {
            this.setState({
                user: results
            })
        });
        if(!localStorage.getItem('creds')){
            browserHistory.push('/');
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
                <br></br>
                <p>Welcome {this.state.user.name}</p>
            </div>
        )
    }
}