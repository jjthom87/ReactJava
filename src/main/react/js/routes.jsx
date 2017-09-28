import React from 'react';
import {Route} from 'react-router';

import App from './app.jsx';
import Application from './application.jsx';
import Home from './home.jsx';

export default (
	<Route component={Application}>
		<Route path="/" component={Home}/>
		<Route path="/home" component={App}/>
	</Route>
)