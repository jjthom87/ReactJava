import React, { Component } from 'react';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	createUser(e){
		e.preventDefault();
		const firstName = this.refs.firstName.value;
        const lastName = this.refs.lastName.value;
        const userName = this.refs.userName.value;
        const password = this.refs.password.value;

        const newUser = { firstName, lastName, userName, password }

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
				<p>React Home</p>
				<form onSubmit={this.createUser.bind(this)}>
					<input type="text" placeholder="firstName" ref="firstName"/>
					<br></br>
					<input type="text" placeholder="lastName" ref="lastName"/>
					<br></br>
					<input type="text" placeholder="userName" ref="userName"/>
					<br></br>
					<input type="password" placeholder="password" ref="password"/>
					<br></br>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}