import React, { Component } from 'react';
import Habit from './Habit';

class Dashboard extends Component {
  /*
    When components mounts, fetch user habits from backend
    For each habit the user has defined create a Habit element.
  */

  constructor(props){
    super();
    this.state = {
      habits: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:3001/api/occurrence_habits')
      .then(response => response.json())
      .then(results => this.setState({ habits: results }))
  }

  handleUpdate(id, numCompleted){
    console.log(id, numCompleted)
    let existing_habits = this.state.habits
    // 1. Find the habit we are updating
    const habit_index = this.state.habits.findIndex(habit => habit.id === id)

    // 2. change the value of num of completed
    existing_habits[habit_index].completed = numCompleted

    // 3. Update the state with new habit object but keeping older ones??
    this.setState({habits: existing_habits})

    console.log(JSON.stringify(existing_habits[habit_index]));
    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(existing_habits[habit_index])
    })
    .then(response => response.json())
    .then(result => console.log(result))

  }

  render() {
    const habitsElements = this.state.habits.map(habit => <Habit key={habit.id} habit={habit} onUpdated={this.handleUpdate.bind(this)}/>)
    console.log(habitsElements)
    return (
        <div>
            <h1 className="lead mt-3">Dashboard</h1>
            <br/>
            {habitsElements}
            {/* Dashbaord contains a list of habits */}
      </div>
    );
  }
}

export default Dashboard;
