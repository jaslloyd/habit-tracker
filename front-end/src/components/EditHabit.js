import React, { Component } from 'react';
import HabitSuggestion from './HabitSuggestion';

class EditHabit extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            name : '',
            description: '',
            category: '',
            month: '',
            days: 0,
            existing_habits: []
        }
        this.id = this.props.match.params.id
    }

    componentDidMount(){
        this.getHabitById();
        this.getHabits();
    }

    getHabits(){
        fetch('http://localhost:3001/api/occurrence_habits')
          .then(response => response.json())
          .then(results => this.setState({existing_habits: results}))
          .catch(e => console.log(`Failed to get all habits ${e}`));
    }

    getHabitById(){
        fetch(`http://localhost:3001/api/occurrence_habits/${this.id}`)
            .then(response => response.json())
            .then(results => this.setState({
                name: results.name,
                description: results.description,
                category: results.category,
                month: results.target_month,
                days: results.target,
                completed: results.completed
            }))
            .catch(e => console.log(e));
    }

    handleInputChange(e){
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmit(e){
        const editedHabit = {
            'name': this.state.name,
            'description': this.state.description,
            'category': this.state.category,
            'target': parseInt(this.state.days, 10),
            'completed': this.state.completed,
            'target_month': this.state.month
        }

        fetch(`http://localhost:3001/api/occurrence_habits/${this.id}`, {
            method: 'PUT',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedHabit)
          })
          .then(response => response.json())
          .then(result => this.props.history.push('/'))
          .catch(e => console.log(`Failed to edit habit ${e}`));

        e.preventDefault()
    }

    handleSelectedHabit(e){
        console.log('Selected...')
        console.log(e.target)
        e.preventDefault()
    }

    render() {
        const habitsElements = this.state.existing_habits.map(habit => <HabitSuggestion key={habit.id} habit={habit} onSelect={this.handleSelectedHabit.bind(this)} />)      
        return (
            <div>
                <h1 className="m-3">Edit Habit</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="habit_name">Habit Name:</label>
                        <input type="text" className="form-control" name="name" placeholder="Habit Name e.g. Wake up before 8am each day" value={this.state.name} onChange={this.handleInputChange.bind(this)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_desc">Description:</label>
                        <input type="text" className="form-control" name="description" placeholder="Why do you want to complete it?" value={this.state.description} onChange={this.handleInputChange.bind(this)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_cat">Category:</label>
                        <input type="text" className="form-control" name="category" placeholder="Health / Finance / Career" onChange={this.handleInputChange.bind(this)} value={this.state.category} required />
                    </div>
                    <div className="form-group">
                    <label htmlFor="habit_mon">Month of Habit: {this.state.month}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="habit_target">How many days do you want to do this habit?</label>
                        <input type="number" className="form-control" name="days" step="1" min="1" max="30" value={this.state.days} onChange={this.handleInputChange.bind(this)}  required />
                    </div>
                    <div className="row">
                        {habitsElements}
                    </div>
                    <button type="submit" className="btn btn-primary">Update Habit</button>
                </form>
            </div>
        )
    }

}

export default EditHabit;