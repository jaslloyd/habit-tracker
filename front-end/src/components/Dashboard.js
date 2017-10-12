import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Habit from './Habit';
import moment from 'moment'

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
    this.days_left = moment().endOf('month').diff(moment().today, 'days')
    this.current_month = moment().format('MMMM')
    this.current_day_month = moment().format('D')
    this.percentage_days_gone = Math.ceil((this.current_day_month / moment().daysInMonth()) * 100)
  }
  componentDidMount(){
    this.getHabits()
  }

  getHabits(){
    fetch('http://localhost:3001/api/occurrence_habits')
      .then(response => response.json())
      .then(results => this.setState({ habits: results }))  
  }

  handleHabitItemUpdate(id, numCompleted){
    console.log(id, numCompleted)
    let existing_habits = this.state.habits
    // 1. Find the habit we are updating
    const habit_index = this.state.habits.findIndex(habit => habit.id === id)

    // 2. change the value of num of completed
    existing_habits[habit_index].completed = numCompleted

    // 3. Update the state with new habit object but keeping older ones??
    this.setState({habits: existing_habits})

    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(existing_habits[habit_index])
    })
    .then(response => response.json())
    .then(result => console.log(`Habit: ${id} updated...`))
  }

  handleHabitDelete(id){
    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      console.log(`Habit ${id} deleted...`)
      this.getHabits()
    })
  }

  render() {
    const habitsElements = this.state.habits.map(habit => <Habit key={habit.id} habit={habit} monthDaysLeft={this.days_left} onHabitItemUpdated={this.handleHabitItemUpdate.bind(this)} onDelete={this.handleHabitDelete.bind(this)} />)
    return (
        <div>
            <h1 className="lead mt-3">Dashboard</h1>
            <br/>
            <div className="row">
              <div className="col-md-12 text-center">
                <h4>{this.current_month} - {this.days_left} Days Left!</h4>
              </div>
              <div className="col-md-9">
              {/* <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${this.percentage_days_gone}%`}} aria-valuenow={this.current_day_month} aria-valuemin="1" aria-valuemax={moment().endOf('month')}>{this.current_day_month} Days</div>
              </div> */}
              </div>
            </div>
          
            <div className="row">
              <div className="ml-auto col-md-3">
              <Link to="/addhabit" type="button" className="btn btn-success pull-right">Add Habit</Link>
              </div>
            </div>
            <div id="habit-list" className="mt-3">
              {habitsElements}
            </div>
      </div>
    );
  }
}

export default Dashboard;
