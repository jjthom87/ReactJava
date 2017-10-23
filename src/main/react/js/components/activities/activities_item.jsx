import React, { Component } from 'react';

export default class ActivitiesItem extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        };
    }
	render(){
		const { activity, timeSpent } = this.props;
		return (
			<div>
				<p>Activity: {activity}</p>
				<p>Time Spent: {timeSpent}</p>
			</div>
		);
	}
}