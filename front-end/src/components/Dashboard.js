import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Habit from './Habit';
import moment from 'moment'

class Dashboard extends Component {
  /*
    When components mounts, fetch user habits from backend
    For each habit the user has defined create a Habit element.
  */
  state = {
    habits: [],
    current_month: moment().format('MMMM'),
    filter_obj: `{"where": {"target_month": "${moment().format('MMMM')}", "year": "${moment().format('YYYY')}"}}`,
    curr_mon_days_left: moment().endOf('month').diff(moment().today, 'days'),
    days_left:  moment().endOf('month').diff(moment().today, 'days'),
    display_month_index: 0, // This will be used to track what month is displaying compared to the current month
    displayed_year: moment().format('YYYY')
  }

  componentDidMount(){
    this.getFilteredHabits(this.state.filter_obj)
  }

  getFilteredHabits = (filter_obj) => {
    fetch(`http://localhost:3001/api/occurrence_habits?filter=${filter_obj}`)
      .then(response => response.json())
      .then(results => this.setState({ habits: results }))
      .catch(e => console.log(`Failed to get filitered habits ${e}`));
  }

  handleHabitItemUpdate = (id, numCompleted) => {
    let existing_habits = this.state.habits
    // 1. Find the habit we are updating
    const habit_index = this.state.habits.findIndex(habit => habit.id === id)
    // 2. change the value of num of completed
    existing_habits[habit_index].completed = numCompleted
    // 3. Set the last_updated date to today.
    existing_habits[habit_index].last_updated = moment().format('Do')
    // 4. Update the state with new habit object but keeping older ones??
    this.setState({habits: existing_habits})
    // 5. Update the habit in the backend
    this.updateHabit(existing_habits[habit_index], id)
  }

  updateHabit = (habitDetails, id) =>{
    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(habitDetails)
    })
    .then(response => response.json())
    .then(result => console.log(`Habit: ${id} updated...`))
    .catch(e => console.log(`Failed to Update habit ${e}`));
  }

  handleHabitDelete = (id) => {
    fetch(`http://localhost:3001/api/occurrence_habits/${id}`, {method: 'DELETE'})
      .then(response => response.json())
      .then(result => {
      console.log(`Habit ${id} deleted...`)
      this.getFilteredHabits(this.state.filter_obj)
    })
    .catch(e => console.log(`Failed to Delete habit ${e}`));
  }

  displayMonthsHabits = (e) =>{
    // This is kinda confusing, when we want to go back we subtract that number from the current month, if it is minus we still subtract but we update the index -1
    const data_operation_num = parseInt(e.target.getAttribute('data-operation'), 10);
    const new_index = data_operation_num !== 0 ? this.state.display_month_index + data_operation_num :  0
    const displayed_month = moment().subtract(new_index, 'month').format('MMMM')
    const new_displayed_year = moment().subtract(new_index, 'month').format('YYYY')
    const filter_obj = this.state.filter_obj.replace(this.state.current_month, displayed_month).replace(this.state.displayed_year, new_displayed_year)
   
    this.getFilteredHabits(filter_obj)
    this.setState({
      current_month: displayed_month,
      filter_obj: filter_obj, 
      display_month_index: new_index,
      displayed_year: new_displayed_year,
      days_left: moment().subtract(new_index, 'month').endOf('month').diff(moment().today, 'days')
    })
    e.preventDefault()
  }

  render() {
    // todo: Needs to be a way better way to do this...
    //1. Get all the categories
    const categories = this.state.habits.map(habit => habit.category)
    let items = {};
    // 2. For each unique category, create a new category in items which will contain a list of Habits that are of that category
    [...new Set(categories)].forEach(cat => {
        items[cat] = this.state.habits.filter(habit => habit.category === cat) // Filter to only habits that match the category
                                        .map(habit => <Habit key={habit.id} habit={habit} monthDaysLeft={this.state.days_left} onHabitItemUpdated={this.handleHabitItemUpdate} onDelete={this.handleHabitDelete} />) // For each habit in that category create a habit element
    })

    // 3. Loop through each category and add some extra html, this will be its own component later (HabitGroup)
    const final_elements = Object.keys(items).map(item => {
      return (
        // This should be its own component...
        <div key={item} id={item} className="card-box col-10 mx-auto">
          <h4 className="header-title mb-4"><b>{item}</b></h4>
          {items[item]}
        </div>
      )
    })

    return (
        <div id="dashboard">
            <div className="row mt-3">
              <div className="ml-auto col-md-6 text-center">
                <h4 className="header-title-big">
                  <i onClick={this.displayMonthsHabits} data-operation="+1" className="mr-3 fa fa-chevron-left btn-link" aria-hidden="true" role="button"></i>
                  {this.state.current_month} - {this.state.displayed_year}
                  <i onClick={this.displayMonthsHabits} data-operation="-1" className="ml-3 fa fa-chevron-right btn-link" aria-hidden="true" role="button"></i>
                </h4>
              </div>
              <div className="col-2">
                <h4 className="header-title">Month: 
                  <a href="" onClick={this.displayMonthsHabits} data-operation="0"> {moment().format('MMMM')}</a>
                  <span className="ml-2">{this.state.curr_mon_days_left} Days Left!</span>
                </h4>
              </div>
              <div className="col-md-1">
                <Link to="/addhabit" type="button" className="btn btn-success pull-right">Add Habit</Link>
              </div>
            </div>
            <div id="habit-list" className="mt-3 row">
                {final_elements}
            </div>
      </div>
    );
  }
}

export default Dashboard;
