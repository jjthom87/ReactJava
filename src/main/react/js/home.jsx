import React, { Component } from 'react';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	createUser(e){
		e.preventDefault();
        const name = this.refs.name.value;
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        const newUser = { name, username, password }

		fetch('/api/create', {
            method: 'post',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        	}).then((response) => response.json())
            .then((results) => {
            	    console.log(results)
            });
	}
	render() {
		return (
			<div>
				<p>Sign Up Form</p>
				<form onSubmit={this.createUser.bind(this)}>
					<input type="text" placeholder="name" ref="name"/>
					<br></br>
					<input type="text" placeholder="username" ref="username"/>
					<br></br>
					<input type="password" placeholder="password" ref="password"/>
					<br></br>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}