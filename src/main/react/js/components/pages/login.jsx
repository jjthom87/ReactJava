import React, { Component } from 'react';
import { Router , browserHistory, Link } from 'react-router';

import LoginPageNav from './../navs/login_page_nav.jsx';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	loginUser(e){
		e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        const newUser = {username, password}

		fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        	}).then((response) => {
        	        console.log(response.status)
               if(response.status == 200){
                   localStorage.setItem('creds', response.headers.get('Auth'));
                   localStorage.setItem('user', response.headers.get('CurrentUser'))
                   browserHistory.push('/userhome');
               } else if (response.status == 401){
                   alert ('Incorrect Login Credentials');
               } else if (response.status == 500){
                   alert ('Please Verify Email')
               }
        });
	}
	componentWillMount(){
        fetch('/api/login-page', {
            headers: {
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
        }).then((response) => response.json())
        .then((results) => {
            if(results.userLoggedIn){
                browserHistory.push('/userhome')
            }
        });
	}
	render() {
		return (
			<div className="text-center">
		        <LoginPageNav />
				<form onSubmit={this.loginUser.bind(this)}>
				    <div className="grid-container">
				        <div className="grid-x grid-padding-x">
				            <div className="small-4 small-centered columns">
				            </div>
				            <div className="small-4 small-centered columns">
		                        <div id="login-panel" className="panel callout radius">
		                            <p>Login Form</p>
                    					<input type="text" placeholder="username" ref="username"/>
                    					<br></br>
                    					<input type="password" placeholder="password" ref="password"/>
                    					<br></br>
                    					<input type="submit" className="success button" value="Login"/>
		                        </div>
				            </div>
				        </div>
				    </div>
				</form>
                <br></br>
                <p>Havent <Link to="/register">Signed Up</Link>?</p>
			</div>
		)
	}
}