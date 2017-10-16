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
      habits: [],
      current_month: moment().format('MMMM'),
      filter_obj: `{"where": {"target_month": "${moment().format('MMMM')}"}}`,
      days_left: moment().endOf('month').diff(moment().today, 'days'),
      display_month_index: 0 // This will be used to track what month is displaying compared to the current month
    }
  }
  componentDidMount(){
    this.getFilteredHabits(this.state.filter_obj)
  }

  getHabits(){
    fetch('http://localhost:3001/api/occurrence_habits')
      .then(response => response.json())
      .then(results => this.setState({ habits: results }))
      .catch(e => console.log(`Failed to get all habits ${e}`));
  }

  getFilteredHabits(filter_obj){
    // {"where":{"target":"10"}}
    console.log(`http://localhost:3001/api/occurrence_habits?filter=${filter_obj}`)
    fetch(`http://localhost:3001/api/occurrence_habits?filter=${filter_obj}`)
      .then(response => response.json())
      .then(results => this.setState({ habits: results }))
      .catch(e => console.log(`Failed to get filitered habits ${e}`));
  }

  handleHabitItemUpdate(id, numCompleted){
    console.log(id, numCompleted)
    let existing_habits = this.state.habits
    // 1. Find the habit we are updating
    const habit_index = this.state.habits.findIndex(habit => habit.id === id)
    // 2. change the value of num of completed
    existing_habits[habit_index].completed = numCompleted
    // 3. Set the last_updated date to today.
    existing_habits[habit_index].last_updated = moment().format('Do')
    // 4. Update the state with new habit object but keeping older ones??
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
    .catch(e => console.log(`Failed to Update habit ${e}`));
  }

  handleHabitDelete(id){
    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      console.log(`Habit ${id} deleted...`)
      this.getFilteredHabits(this.state.filter_obj)
    })
    .catch(e => console.log(`Failed to Delete habit ${e}`));
  }

  // todo: Bad name for function as 'next' is very vague word, also does too much...refactor
  displayNextMonth(e){
    let new_index;
    // This is kinda confusing, when we want to go back we subtract that number from the current month, if it is minus we still subtract but we update the index -1
    const data_operation = e.target.getAttribute('data-operation');

    if(data_operation === '+1'){
      new_index = this.state.display_month_index + 1
    }else if(data_operation === '-1'){
      new_index = this.state.display_month_index - 1
    }else{
      new_index = 0
    }
    const displayed_month = moment().subtract(new_index, 'month').format('MMMM')
    const filter_obj = this.state.filter_obj.replace(this.state.current_month, displayed_month)
    this.getFilteredHabits(filter_obj)
    this.setState({
      current_month: displayed_month,
      filter_obj: filter_obj, 
      display_month_index: new_index 
    })
    e.preventDefault()
  }

  render() {
    const habitsElements = this.state.habits.map(habit => <Habit key={habit.id} habit={habit} monthDaysLeft={this.state.days_left} onHabitItemUpdated={this.handleHabitItemUpdate.bind(this)} onDelete={this.handleHabitDelete.bind(this)} />)
    return (
        <div>
            <div className="row mt-3">
              <div className="col-6">
                <h1 className="lead">Dashboard</h1>
              </div>
              <div className="ml-auto col-2">
                <h6 className="">Current Month: <a href="" onClick={this.displayNextMonth.bind(this)} data-operation="reset">{moment().format('MMMM')}</a></h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <h4>
                  {/* Blank href causing fanotom elements */}
                  <a href="" onClick={this.displayNextMonth.bind(this)}><span><i data-operation="+1" className="mr-2 fa fa-chevron-left" aria-hidden="true"></i></span></a>
                  {this.state.current_month} - {this.state.days_left} Days Left!
                  <a href="" onClick={this.displayNextMonth.bind(this)}><span><i data-operation="-1" className="ml-2 fa fa-chevron-right" aria-hidden="true"></i></span></a>
                </h4>
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
