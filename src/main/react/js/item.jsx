import React, { Component } from 'react';

export default class Item extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
	render(){

		const { firstName, lastName, userName } = this.props;

		return (
			<tr>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{userName}</td>
			</tr>
		);
	}
}