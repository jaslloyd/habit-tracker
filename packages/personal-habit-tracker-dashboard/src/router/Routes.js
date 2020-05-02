import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddMonthlyHabit from '../screens/MonthlyDashboard/AddMonthlyHabit';
import AddChallengeHabit from '../screens/ChallengeDashboard/AddChallengeHabit';
import EditHabit from '../screens/EditHabit/EditHabit';
import Dashboard from '../screens/MonthlyDashboard/Dashboard';
import Login from '../screens/Login/Login';
import Summary from '../screens/Summary/Summary';
import PrivateRoute from './PrivateRoute';
import ChallengeDashboard from '../screens/ChallengeDashboard/ChallengeDashboard';
import Demo from '../screens/Demo/Demo';
import NotFound from '../screens/NotFound';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/authlogin" component={Login} />
      <Route exact path="/demo" component={Demo} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/addhabit/monthly" component={AddMonthlyHabit} />
      <PrivateRoute exact path="/addhabit/challenge" component={AddChallengeHabit} />
      <PrivateRoute exact path="/editHabit/:id" component={EditHabit} />
      <PrivateRoute exact path="/summary" component={Summary} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/challenge" component={ChallengeDashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </main>
);
export default Routes;
