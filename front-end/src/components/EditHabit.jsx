import React, { Component, Fragment } from 'react';
import FormGroup from './FormGroup';

class EditHabit extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    month: '',
    days: 0,
    last_updated: '',
    year: '',
  };

  componentDidMount() {
    this.id = this.props.match.params.id;
    this.getHabitById();
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const editedHabit = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      target: parseInt(this.state.days, 10),
      completed: this.state.completed,
      target_month: this.state.month,
      last_updated: this.state.last_updated,
      year: this.state.year,
    };

    const requestObj = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedHabit),
    };

    await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/${this.id}`, requestObj)).json();
    this.props.history.push('/');
    // .catch(e => console.log(`Failed to edit habit ${e}`));
  }

  getHabitById = async () => {
    const {
      name, description, category, target_month, target, completed, last_updated, year,
    } = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/${this.id}`)).json();
    this.setState({
      name,
      description,
      category,
      month: target_month,
      days: target,
      completed,
      last_updated,
      year,
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <Fragment>
        <h1 className="m-3">Edit Habit</h1>
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <label htmlFor="habit_name">Habit Name:</label>
            <input type="text" className="form-control" name="name" placeholder="Habit Name e.g. Wake up before 8am each day" value={this.state.name} onChange={this.handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="habit_desc">Description:</label>
            <input type="text" className="form-control" name="description" placeholder="Why do you want to complete it?" value={this.state.description} onChange={this.handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="habit_cat">Category:</label>
            <input type="text" className="form-control" name="category" placeholder="Health / Finance / Career" onChange={this.handleInputChange} value={this.state.category} required />
          </FormGroup>
          <FormGroup>
            <label htmlFor="habit_mon">Month of Habit: {this.state.month}</label>
          </FormGroup>
          <FormGroup>
            <label htmlFor="habit_target">How many days do you want to do this habit?</label>
            <input type="number" className="form-control" name="days" step="1" min="1" value={this.state.days} onChange={this.handleInputChange} required />
          </FormGroup>
          <button type="submit" className="btn btn-primary">Update Habit</button>
        </form>
      </Fragment>
    );
  }
}

export default EditHabit;
