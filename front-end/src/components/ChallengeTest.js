import React, { Component } from 'react';
import HabitItem from './HabitItem';

class ChallengeTest extends Component {

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
        <h1>ChallengeTest</h1>
        {/* Input field for amount of days for challenge, for each of that input, generate one box per day... */}
        <input type="text" className="form-control" name="days" placeholder="Picks Days for Challenges" value={this.state.days} onChange={this.handleInputChange} required />
        {
          this.state.days &&
            new Array(parseInt(this.state.days, 10)).fill().map((_, i) => (
              <HabitItem key={[i + 1]} index={i} completed={0} onCompleted={this.onCompleted} classSettings="big-box" />
            ))
        }
      </div>
    );
  }
}

export default ChallengeTest;
