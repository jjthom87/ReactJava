import React from 'react';
import {Route} from 'react-router';

import Application from './components/application.jsx';

import App from './components/pages/app.jsx';
import Register from './components/pages/register.jsx';
import Login from './components/pages/login.jsx';
import UserHome from './components/pages/user_home.jsx';
import MainPage from './components/pages/main_page.jsx';

export default (
	<Route component={Application}>
		<Route path="/" component={MainPage}/>
		<Route path="/home" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/userhome" component={UserHome}/>
	</Route>
)