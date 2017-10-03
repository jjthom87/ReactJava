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
                'content-type': 'application/json',
                'accept': 'application/json'
            }
            }).then((response) => {
               if(response.status == 200){
                   localStorage.removeItem('creds');
                   localStorage.removeItem('user');
                   browserHistory.push('/login');
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
        var renderLogout = () => {
            if(this.state.loggedInUser != null){
                return(
                    <div className="top-bar-right">
                        <button type="button" className="alert button" onClick={this.onLogout.bind(this)}>Logout</button>
                    </div>     
                )
            } else {
                return(
                   <div></div>
                )
            }
        }
        return (
          <div className="top-bar">
                <div className="top-bar-left">
                    <Link className="main-nav-register-link" to="/register">Register</Link>
                    <Link className="main-nav-login-link" to="/login">Login</Link>
                </div>
                {renderLogout()}
          </div>
        )
    }
}