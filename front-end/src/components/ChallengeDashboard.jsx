import React, { Component, Fragment } from 'react';
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
  }

  // todo: Dry up duplicated in Dashboard
  handleHabitItemUpdate = (id, numCompleted) => {
    const existingHabits = this.state.habits;
    // 1. Find the habit we are updating
    const habitIndex = this.state.habits.findIndex(habit => habit.id === id);
    const habit = existingHabits[habitIndex];
    // 2. Check if your adding a completion or removing a completion
    const isNewEntry = numCompleted > habit.completed;
    // 2. change the value of num of completed
    habit.completed = numCompleted;
    // Only update the last_updated when a new entry is added.
    if (isNewEntry) {
    // 3. Set the last_updated date to today.
      habit.last_updated = moment().format('Do@HH:mm');
      // 3.5 Update the lastUpdated list so we can keep track of all the dates...
      if (habit.lastUpdated) {
        habit.lastUpdated.push({
          date: moment().format('Do'),
          time: moment().format('HH:mm'),
        });
      }
    }

    // 4. Update the state with new habit object
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
  }

  render() {
    console.log(this.state.habits);
    const challengeHabits = this.state.habits.length > 0 && this.state.habits.map(habit => (
      <div id={habit.name} key={habit.name} className="card-box col-10 mx-auto pl-0 pr-0 pt-0 pb-0" style={{ lineHeight: '0' }}>
        <ChallengeHabit key={habit.name} habit={habit} onHabitItemUpdated={this.handleHabitItemUpdate} onDelete={this.handleHabitDelete} />
      </div>
    ));

    return (
      <Fragment>
        <div className="row mb-3 mt-3">
          <div className="ml-auto col-md-8 text-center">
            <h3>Challenges</h3>
          </div>
          <div className="col-md-2">
            <Link to="/addhabit/challenge" type="button" params={{ habitType: 'challenge' }} className="btn btn-success pull-right">Add Habit</Link>
          </div>
        </div>
        <div className="mt-2 mb-2 mx-auto">
          {challengeHabits}
        </div>
      </Fragment>
    );
  }
}

export default ChallengeDashboard;
