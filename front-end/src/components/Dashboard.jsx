import React, { Component, Fragment } from 'react';
import moment from 'moment';
import MonthlyDashboard from './MonthlyDashboard';
// import ChallengeDashboard from './ChallengeDashboard';

class Dashboard extends Component {
  /*
    When components mounts, fetch user habits from backend
  */
  state = {
    habits: [],
  }

  // todo: DRY up duplicated in ChallengeDashboard
  componentDidMount() {
    this.getHabits();
  }

  getHabits = async () => {
    const habits = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits`)).json();
    this.setState({ habits });
  }

  // todo: DRY up duplicated in ChallengeDashboard
  handleHabitItemUpdate = (id, numCompleted) => {
    const existingHabits = this.state.habits;
    // 1. Find the habit we are updating
    const habitIndex = this.state.habits.findIndex(habit => habit.id === id);
    // 2. change the value of num of completed
    existingHabits[habitIndex].completed = numCompleted;
    // 3. Set the last_updated date to today.
    existingHabits[habitIndex].last_updated = moment().format('Do@HH:mm');
    // 3.5 Update the lastUpdated list so we can keep track of all the dates...
    if (existingHabits[habitIndex].lastUpdated) {
      existingHabits[habitIndex].lastUpdated.push({
        date: moment().format('Do'),
        time: moment().format('HH:mm'),
      });
    }
    // 4. Update the state with new habit object but keeping older ones??
    this.setState({ habits: existingHabits });
    // 5. Update the habit in the backend
    this.updateHabit(existingHabits[habitIndex], id);
  }

  // todo: DRY up duplicated in ChallengeDashboard
  updateHabit = async (habitDetails, id) => {
    const requestDetails = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habitDetails),
    };

    await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/${id}`, requestDetails)).json();
    console.log(`Habit: ${id} updated...`);
    // .catch(e => console.log(`Failed to Update habit ${e}`));
  }

    // todo: DRY up duplicated in ChallengeDashboard
  handleHabitDelete = async (id) => {
    await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/${id}`, { method: 'DELETE' })).json();
    this.getHabits();
      // .catch(e => console.log(`Failed to Delete habit ${e}`));
  }

  render() {
    return (
      <Fragment id="dashboard">
        <MonthlyDashboard habits={this.state.habits} onHabitItemUpdate={this.handleHabitItemUpdate} onHabitDelete={this.handleHabitDelete} />
        {/* <ChallengeDashboard /> */}
      </Fragment>
    );
  }
}

export default Dashboard;
