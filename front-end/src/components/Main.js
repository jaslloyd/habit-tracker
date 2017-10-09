import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AddHabit from './AddHabit';
import Dashboard from './Dashboard';
import Login from './Login';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/addhabit' component={AddHabit} />
        </Switch>
    </main>
)
export default Main;
