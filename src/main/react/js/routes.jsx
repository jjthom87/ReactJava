import React from 'react';
import {Route} from 'react-router';

import App from './app.jsx';
import Application from './application.jsx';
import Register from './register.jsx';
import Login from './login.jsx';
import UserHome from './user_home.jsx';
import FrontPage from './frontpage.jsx';

export default (
	<Route component={Application}>
		<Route path="/" component={FrontPage}/>
		<Route path="/home" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/userhome" component={UserHome}/>
	</Route>
)