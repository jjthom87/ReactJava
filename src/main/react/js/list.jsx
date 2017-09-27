import React, { Component } from 'react';
import Item from './item'

export default class List extends Component {
	render() {
		const { users } = this.props;
		var renderUsers = () => {
            return users.map((user, index) => {
                return (
                    <Item
                    	firstName={user.firstName}
                    	lastName={user.lastName}
                        userName={user.userName}
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