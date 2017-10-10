import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

var uuid = require('node-uuid');

export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
		    submitPressed: false
		}
	}
	createUser(e){
		e.preventDefault();
        const name = this.refs.name.value;
        const username = this.refs.username.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        const newUser = { name, username, email, password, uid: uuid(), verified: false }

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
            if(results.username){
                browserHistory.push('/login');
            }
            if(results.message === "Username Taken"){
                alert("Username has already been taken. Please input another one")
            }
        });
        this.setState({
            submitPressed: true
        })
	}
	render() {
	    var appendLoader = () => {
           if(this.state.submitPressed){
               return (
                    <img style={{height: '850px'}} src={'https://zippy.gfycat.com/HotGrizzledAsianporcupine.gif'}/>
               )
            } else {
                return (
                    <div>
                        <p>Sign Up Form</p>
                        <form onSubmit={this.createUser.bind(this)}>
                            <input type="text" placeholder="name" ref="name"/>
                            <br></br>
                            <input type="text" placeholder="username" ref="username"/>
                            <br></br>
                            <input type="text" placeholder="email" ref="email"/>
                            <br></br>
                            <input type="password" placeholder="password" ref="password"/>
                            <br></br>
                            <input type="submit"/>
                        </form>
                        <br></br>
                        <p>Already a member. Please <Link to="/login">Login</Link></p>
                    </div>
                )
            }
	    }
		return (
		    <div>
		        {appendLoader()}
		    </div>
		)
	}
}