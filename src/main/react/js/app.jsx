import React, { Component } from 'react';

import List from './list.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}
	componentWillMount() {
		fetch('/api/all', {
		}).then((response) => response.json())
		.then((results) => {
			this.setState({
				users: results
			})
		});
	}
	render() {
		return (
			<div>
				<p>React Start</p>
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<List users={this.state.users}/>
				</table>
			</div>
		)
	}
}