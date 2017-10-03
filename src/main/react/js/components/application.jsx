import React, { Component, cloneElement } from 'react';

export default class Application extends React.Component {
	render() {
		return (
			<div>
				{
					cloneElement(this.props.children, {
				  })
				}
			</div>
		);
	}
}