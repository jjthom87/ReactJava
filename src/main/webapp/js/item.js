import React, { Component } from 'react';

export default class Item extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
	render(){

		const { firstName, lastName, nickName } = this.props;

		return (
			<tr>
				<td>{firstName}</td>
				<td>{lastName}</td>
				<td>{nickName}</td>
			</tr>
		);
	}
}