import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ChallengeHabit from './ChallengeHabit';

// This class has a lot of duplciate logic from Dashboard.js, I will continue to get it working then refactor/generalize as do not want to do that to early.
class ChallengeDashboard extends Component {

  state = {
    filter_obj: `{"where": {"target_month": "challenge", "year": "${moment().format('YYYY')}"}}`,
    habits: [],
  }

  // todo: Dry up duplicated in Dashboard
  componentDidMount() {
    this.getHabits();
  }

  getHabits = async () => {
    const results = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits?filter=${this.state.filter_obj}`)).json();
    this.setState({ habits: results });
    // .catch(e => console.log(`Failed to get all habits ${e}`));
  }

    // todo: Dry up duplicated in Dashboard
  handleHabitItemUpdate = (id, numCompleted) => {
    const existingHabits = this.state.habits;
     // 1. Find the habit we are updating
    const habitIndex = this.state.habits.findIndex(habit => habit.id === id);
     // 2. change the value of num of completed
    existingHabits[habitIndex].completed = numCompleted;
     // 3. Set the last_updated date to today.
    existingHabits[habitIndex].last_updated = moment().format('Do@HH:mm');
     // 4. Update the state with new habit object but keeping older ones??
    this.setState({ habits: existingHabits });
     // 5. Update the habit in the backend
    this.updateHabit(existingHabits[habitIndex], id);
  }

  // todo: DRY up duplicated in Dashboard
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
  }

  // todo: DRY up duplicated in Dashboard
  handleHabitDelete = async (id) => {
    await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/${id}`, { method: 'DELETE' })).json();
    this.getHabits();
      // .catch(e => console.log(`Failed to Delete habit ${e}`));
  }

  render() {
    const challengeHabits = this.state.habits.length > 0 && this.state.habits.map(habit =>
      <ChallengeHabit key={habit.name} habit={habit} onHabitItemUpdated={this.handleHabitItemUpdate} onDelete={this.handleHabitDelete} />,
    );
    return (
      <div id="challenge-dashboard">
        <div className="header text-center">
          <h3 className="mt-3">Challenge Dashboard</h3>
          <h4>Challenge yourself by Taking X Day Challenges!</h4>
        </div>
        <div className="row mb-3">
          <div className="ml-auto col-md-4">
            <Link to="/addchallengehabit" type="button" className="btn btn-success pull-right">Add Habit</Link>
          </div>
        </div>
        <div className="mt-2 mb-2 mx-auto">
          {challengeHabits}
        </div>
      </div>
    );
  }
}

export default ChallengeDashboard;
