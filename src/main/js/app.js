import React from 'react';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		fetch('/api/all', {
		}).then((response) => response.json())
		.then((results) => {
			console.log(results)
		});
	}

	render() {
		return (
			<div>
				<p>React Start</p>
			</div>
		)
	}
}