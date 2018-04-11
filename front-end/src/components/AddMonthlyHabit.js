import React, { Component, Fragment } from 'react';
import moment from 'moment';
import HabitSuggestion from './HabitSuggestion';
import FormGroup from './FormGroup';

class AddMonthlyHabit
 extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    target: 1,
    existing_habits: [],
    filter_obj: `{"where": {"target_month": "${moment().subtract(1, 'month').format('MMMM')}"}}`,
    year: `${moment().format('YYYY')}`,
    currentMonthIndex: parseInt(moment().format('M'), 10) - 1, // Seems to be 0 indexed
    msg: '',
    month: moment.months(parseInt(moment().format('M'), 10) - 1),
  }

  componentDidMount() {
      this.getHabits();
  }

  getHabits = async () => {
    const results = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits?filter=${this.state.filter_obj}`)).json();
    this.setState({ existing_habits: results });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    // Add habit to db..then redirect
    const newHabit = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      target: parseInt(this.state.target, 10),
      lastUpdated: [],
      completed: 0,
      target_month: this.state.month,
      year: this.state.year
    };

  let filterSettings = `{"name": "${newHabit.name}", "target_month": "${newHabit.target_month}"}`;

    const { count } = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/count?where=${filterSettings}`)).json();
    if (count === 0) {
      this.addHabit(newHabit);
    } else {
      this.setState({ msg: `Habit ${newHabit.name} already exists for month ${newHabit.target_month}` });
    }
  }


  handleSelectedHabit = (e) => {
    this.setState({
      name: e.target.getAttribute('data-name'),
      description: e.target.getAttribute('data-description'),
      category: e.target.getAttribute('data-category'),
      target: e.target.getAttribute('data-target'),
    });
    e.preventDefault();
  }

  addHabit = async (habit) => {
    const requestObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habit),
    };

    await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits`, requestObj)).json();
    this.props.history.push('/');
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const habitsElements = this.state.existing_habits.map(habit => <HabitSuggestion key={habit.id} habit={habit} onSelect={this.handleSelectedHabit} />);
    const msgDisplaying = this.state.msg.length > 0 ? <div className="alert alert-info text-center">{this.state.msg}</div> : '';
    return (
      <Fragment>
        <h1 className="m-3 text-center">Add Habit</h1>
        {msgDisplaying}
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-12">
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <label htmlFor="name">Habit Name:</label>
                <input type="text" className="form-control" name="name" placeholder="Habit Name e.g. Wake up before 8am each day" value={this.state.name} onChange={this.handleInputChange} required />
              </FormGroup>
              <FormGroup>
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" name="description" placeholder="Why do you want to complete it?" value={this.state.description} onChange={this.handleInputChange} required />
              </FormGroup>
              <FormGroup>
                <label htmlFor="category">Category:</label>
                <input type="text" className="form-control" name="category" placeholder="Health / Finance / Career" value={this.state.category} onChange={this.handleInputChange} required />
              </FormGroup>
              <FormGroup>
                <label htmlFor="habit_mon">Month of Habit:</label>
                <select className="form-control" name="month" value={this.state.month} onChange={this.handleInputChange} required>
                  <option disabled>Choose Month</option>
                  <option>{moment.months(this.state.currentMonthIndex)}</option>
                  <option>{moment.months(this.state.currentMonthIndex + 1)}</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label htmlFor="target">How many days do you want to do this habit?</label>
                <input type="number" className="form-control" name="target" step="1" min="1" max="30" placeholder="1" value={this.state.target} onChange={this.handleInputChange} />
              </FormGroup>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-md-3 col-sm-12 habit-suggestions">
            <div className="row">
              {habitsElements}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddMonthlyHabit;
