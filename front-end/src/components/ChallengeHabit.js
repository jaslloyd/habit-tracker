import React, { Component } from 'react';
import HabitItem from './HabitItem';

class ChallengeHabit extends Component {

  state = {
    days: 10,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onCompleted = (index) => {
    console.log(index);
  }

  render() {
    return (
      <div>
        <h1>Challenge Habit</h1>
      </div>
    );
  }
}

export default ChallengeHabit;
