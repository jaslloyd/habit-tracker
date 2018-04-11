import React, { Component, Fragment } from 'react';
import moment from 'moment';
import HabitSuggestion from './HabitSuggestion';
import FormGroup from './FormGroup';


class AddChallengeHabit extends Component {

    state = {
        name: '',
        description: '',
        category: '',
        target: 1,
        existing_habits: [],
        filter_obj: '{"where": {"target_month": "challenge"}}',
        msg: '',
        month: moment.months(parseInt(moment().format('M'), 10) - 1),
        endDate: ''
    }

    componentDidMount() {
        this.getHabits();
    }

    getHabits = async () => {
        const results = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits?filter=${this.state.filter_obj}`)).json();
        this.setState({
            existing_habits: results
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            description,
            category,
            target,
            endDate
        } = this.state;

        const newHabit = {
            name,
            description,
            category,
            target: parseInt(target, 10),
            lastUpdated: [],
            completed: 0,
            target_month: 'challenge',
            year: `${moment().format('YYYY')}`,
            endDate: moment(endDate).format('X')
        }

        const filterSettings = `{"name": "${newHabit.name}", "target_month": "challenge"}`;

        const endDateIncludingDays = moment().add(this.state.target, 'day').format('X');
        const endDateCalender = moment(endDate).format('X')
        // Check if it is impossible to complete the habit by comparing the date the user wants to complete the habit and how many days they want to complete this challenge.
        if (endDateIncludingDays > endDateCalender) {
            console.log('What the hell are you doing... ')
            this.setState({ msg: `You cannot complete ${this.state.target} days before ${moment(endDate).format()}` });
        }
        
        const { count } = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/occurrence_habits/count?where=${filterSettings}`)).json();
        if (count === 0) {
            this.addHabit(newHabit);
        } else {
            this.setState({ msg: `Habit ${newHabit.name} already exists for month ${newHabit.target_month}` });
        }
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
        this.props.history.push('/challenge');
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        // todo: remove 
        if (name === 'endDate') {
            const endDateIncludingDays = moment().add(this.state.target, 'day').format('X');
            const endDateCalender = moment(value).format('X')
            // Check if it is impossible to complete the habit by comparing the date the user wants to complete the habit and how many days they want to complete this challenge.
            if (endDateIncludingDays > endDateCalender) {
                this.setState({ msg: `You cannot complete ${this.state.target} days before ${moment(value).format()}` });
            }
        }

        this.setState({ [name]: value });

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
                                <label htmlFor="target">How many days do you want to do this challenge?</label>
                                <input type="number" className="form-control" name="target" step="1" min="1" placeholder="1" value={this.state.target} onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="endDate">When would you like to achieve this by?</label>
                                <input type="date" className="form-control" name="endDate" value={this.state.endDate} onChange={this.handleInputChange} />
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
        )
    }
}

export default AddChallengeHabit;