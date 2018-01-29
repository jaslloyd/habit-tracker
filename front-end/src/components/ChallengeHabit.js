import React, { Component } from 'react';
import HabitItem from './HabitItem';

// This class has a lot of duplciate logic from Habit.js, I will continue to get it working then refactor/generalize as do not want to do that to early.
class ChallengeHabit extends Component {

  state = {
    days: 10,
  };

  onCompleted = (index) => {
    const { id, completed } = this.props.habit;
    if (index <= completed) {
      this.props.onHabitItemUpdated(id, completed - 1);
    } else {
      this.props.onHabitItemUpdated(id, completed + 1);
    }
  }

  render() {
    const { id, name, target, completed, last_updated } = this.props.habit;
    const habitItemElements = new Array(target).fill().map((_, i) => <HabitItem key={[name, i + 1]} index={i + 1} completed={completed} onCompleted={this.onCompleted} classSettings="big-box" />);
    return (
      <div className="mt-2 mb-2 mx-auto">
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-12">
            <span className="h5"> {name}</span>
          </div>
          <div className="ml-auto col-lg-2 col-md-2 col-sm-12 text-right">
            <span>{completed} / {target}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {habitItemElements}
          </div>

        </div>
      </div>
    );
  }
}

export default ChallengeHabit;
