import React, { Component } from 'react';
import moment from 'moment';

class EditHabit extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            name : '',
            description: '',
            category: '',
            month: '',
            days: 0,
            last_updated: ''
        }
        this.id = this.props.match.params.id
    }

    componentDidMount(){
        this.getHabitById();
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
                completed: results.completed,
                last_updated: results.last_updated
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
            'target_month': this.state.month,
            'last_updated': this.state.last_updated
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

    render() {
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
                    <button type="submit" className="btn btn-primary">Update Habit</button>
                </form>
            </div>
        )
    }

}

export default EditHabit;