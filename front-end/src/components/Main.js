import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddHabit from './AddHabit';
import EditHabit from './EditHabit';
import Dashboard from './Dashboard';
import Login from './Login';
import Summary from './Summary';
import PrivateRoute from './PrivateRoute';

const Main = () => (
  <main>
    <Switch>
      {/* Remove when public */}
      {/* <Route exact path='/' component={Dashboard} />  */}
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/addhabit" component={AddHabit} />
      <PrivateRoute exact path="/editHabit/:id" component={EditHabit} />
      <PrivateRoute exact path="/summary" component={Summary} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  </main>
);
export default Main;
