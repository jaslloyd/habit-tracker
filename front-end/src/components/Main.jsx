import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddHabit from './AddHabit';
import EditHabit from './EditHabit';
import Dashboard from './Dashboard';
import Login from './Login';
import Summary from './Summary';
import PrivateRoute from './PrivateRoute';
import ChallengeDashboard from './ChallengeDashboard';
import AddChallengeHabit from './AddChallengeHabit';
import Demo from './Demo';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/demo" component={Demo} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/addhabit" component={AddHabit} />
      <PrivateRoute exact path="/addchallengehabit" component={AddChallengeHabit} />
      <PrivateRoute exact path="/editHabit/:id" component={EditHabit} />
      <PrivateRoute exact path="/summary" component={Summary} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/challenge" component={ChallengeDashboard} />
    </Switch>
  </main>
);
export default Main;
