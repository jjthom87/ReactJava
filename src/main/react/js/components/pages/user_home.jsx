import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

import UserHomeNav from './../navs/user_home_nav.jsx';
import ActivityForm from './../forms/activity_form.jsx';
import ActivitiesList from './../activities/activities_list.jsx';

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            activities: []
        }
    }
    createActivity(creds){
        const newActivity = {
            'activity' : creds.activity,
            'timeSpent' : parseInt(creds.timeSpent)
        }
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
            }).then((response) => response.json())
            .then((results) => {
                this.setState({
                    activities: this.state.activities.concat(results)
                })
            })
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
            if(results[0].username){
                this.setState({
                    userName: results[0].username,
                    activities: results[1]
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
                    <ActivitiesList activities={this.state.activities}/>
                </div>
            </div>
        )
    }
}