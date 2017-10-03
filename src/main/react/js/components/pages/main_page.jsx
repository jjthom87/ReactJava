import React, { Component } from 'react';
import {Link} from 'react-router';

import MainPageNav from '../navs/main_page_nav.jsx';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }
    render() {
        return (
            <div>
                <MainPageNav/>
                <h1 className="text-center">Welcome to my homepage</h1>
            </div>
        )
    }
}