import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

export default class MainPageNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null
        }
    }
    onLogout(){
        fetch('/api/logout', {
            headers: {
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
            }).then((response) => {
               if(response.status == 200){
                   localStorage.removeItem('creds');
                   localStorage.removeItem('user');
                   this.setState({
                       loggedInUser: null
                   })
               }
        });
    }
    componentWillMount(){
        fetch('/api/mainpage', {
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
                    loggedInUser: results
                })
            }
        });
    }
    render() {
        var renderNav = () => {
            if(this.state.loggedInUser != null){
                return(
                    <div className="top-bar-right" id="main-nav-top-bar-right">
                        <p className="nav-name">{this.state.loggedInUser.name}</p>
                        <button type="button" className="alert button" onClick={this.onLogout.bind(this)}>Logout</button>
                    </div>     
                )
            } else {
                return (
                    <div className="top-bar-left">
                        <Link className="main-nav-register-link" to="/register">Register</Link>
                        <Link className="main-nav-login-link" to="/login">Login</Link>
                    </div>
                )
            }
        }
        return (
          <div className="top-bar">
                {renderNav()}
          </div>
        )
    }
}