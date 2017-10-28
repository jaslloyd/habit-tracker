import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AddHabit from './AddHabit';
import EditHabit from './EditHabit';
import Dashboard from './Dashboard';
import Login from './Login';
import Summary from './Summary';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/addhabit' component={AddHabit} />
            <Route exact path='/editHabit/:id' component={EditHabit} />
            <Route exact path='/summary' component={Summary} />
        </Switch>
    </main>
)
export default Main;
