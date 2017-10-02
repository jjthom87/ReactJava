import React, { Component } from 'react';
import { Router , browserHistory, Link } from 'react-router';

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
               if(response.status == 200){
                   localStorage.setItem('creds', response.headers.get('Authorization'));
                   localStorage.setItem('user', response.headers.get('CurrentUser'))
                   browserHistory.push('/userhome');
               } else {
                   alert ('Incorrect Login Credentials');
               }
        });
	}
	componentWillMount(){
	    if(localStorage.getItem('creds')){
	        browserHistory.push('/userhome')
	    }
	}
	render() {
		return (
			<div>
				<p>Login Form</p>
				<form onSubmit={this.loginUser.bind(this)}>
					<input type="text" placeholder="username" ref="username"/>
					<br></br>
					<input type="password" placeholder="password" ref="password"/>
					<br></br>
					<input type="submit"/>
				</form>
                <br></br>
                <p>Havent Signed Up. Please <Link to="/register">Sign Up</Link></p>
			</div>
		)
	}
}