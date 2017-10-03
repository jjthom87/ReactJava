import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

import UserHomeNav from './../navs/user_home_nav.jsx';

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
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
            if(results.id != null){
                this.setState({
                    user: results
                })
            } else {
                browserHistory.push('/');
            }
        });
    }
    render() {
        return (
            <div>
                <UserHomeNav/>
                <br></br>
                <div className="text-center">
                    <p>Welcome {this.state.user.name}</p>
                </div>
            </div>
        )
    }
}