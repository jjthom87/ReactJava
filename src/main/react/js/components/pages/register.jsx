import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';

import RegisterPageNav from './../navs/register_page_nav.jsx';

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

        const newUser = { name, username, email, password, uid: uuid() }

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
                    <div className="text-center">
                        <RegisterPageNav/>
                        <form onSubmit={this.createUser.bind(this)}>
                            <div className="grid-container">
                                <div className="grid-x grid-padding-x">
                                    <div className="small-4 small-centered columns">
                                    </div>
                                    <div className="small-4 small-centered columns">
                                        <div id="login-panel" className="panel callout radius">
                                            <p>Sign Up Form</p>
                                            <input type="text" placeholder="name" ref="name"/>
                                            <input type="text" placeholder="username" ref="username"/>
                                            <input type="text" placeholder="email" ref="email"/>
                                            <input type="password" placeholder="password" ref="password"/>
                                            <input type="submit" className="success button" value="Register"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
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