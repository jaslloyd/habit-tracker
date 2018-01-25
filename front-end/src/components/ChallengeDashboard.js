import React, { Component } from 'react';
import ChallengeHabit from './ChallengeHabit';

class ChallengeDashboard extends Component {

  state = {
    habits: [],
  }

  render() {
    const challengeHabits = this.state.habits.map(habit =>
      <ChallengeHabit habit={habit} />,
    );
    return (
      <div id="challenge-dashboard">
        <h1>Challenge Dashboard</h1>
        {challengeHabits}
      </div>
    );
  }
}

export default ChallengeDashboard;
