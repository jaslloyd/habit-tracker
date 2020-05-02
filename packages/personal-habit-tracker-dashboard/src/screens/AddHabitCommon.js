import { Component } from 'react';

export default class AddHabitCommon extends Component {
  getHabits = async () => {
    const results = await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits?filter=${this.state.filter_obj}`
    );
    this.setState({ existing_habits: results });
  };

  handleSelectedHabit = e => {
    this.setState({
      name: e.target.getAttribute('data-name'),
      description: e.target.getAttribute('data-description'),
      category: e.target.getAttribute('data-category'),
      target: e.target.getAttribute('data-target'),
    });
    e.preventDefault();
  };

  render() {
    return this.props.children({
      handleSelectedHabit: this.handleSelectedHabit,
    });
  }
}
