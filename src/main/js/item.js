import React, { Component } from 'react';

export default class Item extends Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
	render(){

		const { name, cost, size } = this.props;

		return (
			<tr>
				<td>{name}</td>
				<td>{cost}</td>
				<td>{size}</td>
			</tr>
		);
	}
}