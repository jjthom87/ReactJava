import React, { Component } from 'react';
import Item from './item.js'

export default class List extends Component {
	render() {
		const { dildos } = this.props;
		var renderUsers = () => {
            return users.map((user, index) => {
                return (
                    <Item
                    	firstName={user.firstName}
                    	lastName={user.lastName}
                        nickName={user.nickName}
                        key={index}
                    />
                );
            });
        }
		return (
			<tbody>
				{renderUsers()}
			</tbody>
		);
	}
}