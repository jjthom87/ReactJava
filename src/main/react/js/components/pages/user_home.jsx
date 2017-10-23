import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

import UserHomeNav from './../navs/user_home_nav.jsx';
import ActivityForm from './../forms/activity_form.jsx';

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }
    createActivity(creds){
        const newActivity = {
            'activity' : creds.activity,
            'timeSpent' : parseInt(creds.timeSpent)
        }
        console.log(newActivity)
        fetch('/api/create-activity', {
            method: 'POST',
            body: JSON.stringify(newActivity),
            headers: {
                Auth: localStorage.getItem('creds'),
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
            }).then((response) => {
                console.log(response)
            });
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
            console.log(results)
            if(results[0].username){
                this.setState({
                    userName: results[0].username
                })
            } else {
                localStorage.removeItem('creds');
                localStorage.removeItem('user');
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
                    <p>Welcome {this.state.userName}</p>
                    <ActivityForm saveActivity={this.createActivity.bind(this)}/>
                </div>
            </div>
        )
    }
}