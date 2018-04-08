import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddMonthlyHabit from './AddMonthlyHabit';
import AddChallengeHabit from './AddChallengeHabit';
import EditHabit from './EditHabit';
import Dashboard from './Dashboard';
import Login from './Login';
import Summary from './Summary';
import PrivateRoute from './PrivateRoute';
import ChallengeDashboard from './ChallengeDashboard';
import Demo from './Demo';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/demo" component={Demo} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/addhabit/monthly" component={AddMonthlyHabit} />
      <PrivateRoute exact path="/addhabit/challenge" component={AddChallengeHabit} />
      <PrivateRoute exact path="/editHabit/:id" component={EditHabit} />
      <PrivateRoute exact path="/summary" component={Summary} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/challenge" component={ChallengeDashboard} />
    </Switch>
  </main>
);
export default Main;
