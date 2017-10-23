import React, { Component } from 'react'; 
import ActivitiesItem from './activities_item.jsx';

export default class ActivitiesList extends React.Component {
    render() {
        const { activities } = this.props;
        var renderActivities = () => {
            return activities.map((activity, index) => {
                return (
                    <ActivitiesItem
                        activity={activity.activity}
                        timeSpent={activity.timeSpent}
                        key={index}
                    />
                );
            });
        }
        var noActivities = () => {
            if (activities.length === 0){
                return (
                    <p className="noActivitiesText">No Activities</p>
                );
            }
        }
        return (
            <div>
                <p className="ActivitiesTitle">Activities</p>
                {noActivities()}
                {renderActivities()}
            </div>
        );
    } 
}