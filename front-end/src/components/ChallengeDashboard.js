import React, { Component } from 'react';
import ChallengeHabit from './ChallengeHabit';

class ChallengeDashboard extends Component {

  state = {
    habits: [
      {
        name: 'Test',
        id: '12345',
        target: 10,
        completed: 0,
        last_update: 'Never',
      },
    ],
  }

  render() {
    const challengeHabits = this.state.habits.map(habit =>
      <ChallengeHabit habit={habit} />,
    );
    return (
      <div id="challenge-dashboard">
        <div className="header text-center">
          <h1 className="mt-3">Challenge Dashboard</h1>
          <h3>Challenge yourself by Taking 30 Day Challenges!</h3>
        </div>
        <div className="mt-3 row">
          {challengeHabits}
        </div>
      </div>
    );
  }
}

export default ChallengeDashboard;
