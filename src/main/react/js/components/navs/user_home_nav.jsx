import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

export default class UserHomeNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    onLogout(){
        fetch('/api/logout', {
            headers: {
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            }
            }).then((response) => {
               if(response.status == 200){
                   localStorage.removeItem('creds');
                   localStorage.removeItem('user');
                   browserHistory.push('/');
               }
        });
    }
    render() {
        return (
          <div className="top-bar">
                <div className="top-bar-right">
                    <button type="button" className="alert button" onClick={this.onLogout.bind(this)}>Logout</button>
                </div>
          </div>
        )
    }
}