import React, { Component } from 'react';
import Item from './item.js'

export default class List extends Component {
	render() {
		const { dildos } = this.props;
		var renderDildos = () => {
            return dildos.map((dildo, index) => {
                return (
                    <Item
                    	name={dildo.name}
                    	cost={dildo.cost}
                        size={dildo.size}
                        key={index}
                    />
                );
            });
        }
		return (
			<tbody>
				{renderDildos()}
			</tbody>
		);
	}
}