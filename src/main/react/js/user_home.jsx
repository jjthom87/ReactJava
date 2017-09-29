import React, { Component } from 'react';

export default class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
        fetch('/api/userhome', {
            headers: {
                Auth: localStorage.getItem('creds'),
                User: localStorage.getItem('user'),
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'include'
        }).then((response) => response.json())
        .then((results) => {
            console.log(results)
        });
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}