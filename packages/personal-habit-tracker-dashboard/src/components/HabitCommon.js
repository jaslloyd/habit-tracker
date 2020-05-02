import { Component } from 'react';

export default class HabitCommon extends Component {
  state = {};

  // todo: DRY up duplicated in Dashboard
  updateHabit = async (habitDetails, id) => {
    const requestDetails = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habitDetails),
    };
    await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${id}`, requestDetails)).json();
    console.log(`Habit: ${id} updated...`);
  };

  // todo: DRY up duplicated in Dashboard
  handleHabitDelete = async id => {
    await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${id}`, {
      method: 'DELETE',
    })).json();
    this.getHabits();
  };

  render() {
    return this.props.children({
      updateHabit: this.updateHabit,
      handleHabitDelete: this.handleHabitDelete,
    });
  }
}
