import React from 'react';
import {Route} from 'react-router';

import App from './app.js';
import Application from './application.js';
import Home from './home.js';

export default (
	<Route component={Application}>
		<Route path="/" component={App}/>
		<Route path="/home" component={Home}/>
	</Route>
)