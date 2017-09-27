import React from 'react';
import {Route} from 'react-router';

import App from './app';
import Application from './application';
import Home from './home';

export default (
	<Route component={Application}>
		<Route path="/" component={App}/>
		<Route path="/home" component={Home}/>
	</Route>
)