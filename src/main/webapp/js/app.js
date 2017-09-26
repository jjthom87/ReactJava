import React, { Component } from 'react';

import List from './list.js';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dildos: []
		}
	}
	componentWillMount() {
		fetch('/api/all', {
		}).then((response) => response.json())
		.then((results) => {
			this.setState({
				dildos: results
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
							<th>Name</th>
							<th>Cost</th>
							<th>Size</th>
						</tr>
					</thead>
					<List dildos={this.state.dildos}/>
				</table>
			</div>
		)
	}
}