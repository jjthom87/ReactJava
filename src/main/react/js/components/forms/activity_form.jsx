import React, { Component } from 'react';

export default class ActivityForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	createActivity(e){
		e.preventDefault();
        const activity = this.refs.activity.value;
        const timeSpent = this.refs.timeSpent.value;

        const newActivity = { activity, timeSpent }

        this.props.saveActivity(newActivity);
	}
	render() {
		return (
		    <div>
                <div className="text-center">
                    <form onSubmit={this.createActivity.bind(this)}>
                        <div className="grid-container">
                            <div className="grid-x grid-padding-x">
                                <div className="small-4 small-centered columns">
                                </div>
                                <div className="small-4 small-centered columns">
                                    <div id="login-panel" className="panel callout radius">
                                        <p>Enter Activity</p>
                                        <input type="text" placeholder="Activity" ref="activity"/>
                                        <input type="number" placeholder="Time Spent (in minutes)" ref="timeSpent"/>
                                        <input type="submit" className="primary button"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
		    </div>
		)
	}
}