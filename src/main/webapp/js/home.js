import React, { Component } from 'react';

export default class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	createDildo(e){
		e.preventDefault();
		const name = this.refs.name.value;
        const cost = this.refs.cost.value;
        const size = this.refs.size.value;

        const newDildo = {
        	name,
        	cost,
        	size
        }
		fetch('/api/create', {
            method: 'post',
            body: JSON.stringify(newDildo),
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
				<form onSubmit={this.createDildo.bind(this)}>
					<input type="text" placeholder="name" ref="name"/>
					<br></br>
					<input type="number" placeholder="cost" ref="cost"/>
					<br></br>
					<input type="number" placeholder="size" ref="size"/>
					<br></br>
					<input type="submit"/>
				</form>
			</div>
		)
	}
}