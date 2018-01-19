import React, { Component } from 'react';

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

  render() {
    const elements = new Array(this.state.days).fill(0).map(index => (
      <div>
        {index}
      </div>
    ));
    console.log(elements.length);

    return (
      <div>
        <h1>ChallengeTest</h1>
        {/* Input field for amount of days for challenge, for each of that input, generate one box per day... */}
        <input type="text" className="form-control" name="days" placeholder="Habit Name e.g. Wake up before 8am each day" value={this.state.days} onChange={this.handleInputChange} required />
        {elements}
      </div>
    );
  }
}

export default ChallengeTest;
