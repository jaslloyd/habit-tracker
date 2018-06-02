import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddMonthlyHabit from '../components/AddMonthlyHabit';
import AddChallengeHabit from '../components/AddChallengeHabit';
import EditHabit from '../components/EditHabit';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Summary from '../components/Summary';
import PrivateRoute from './PrivateRoute';
import ChallengeDashboard from '../components/ChallengeDashboard';
import Demo from '../components/Demo';

const Routes = () => (
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
export default Routes;
