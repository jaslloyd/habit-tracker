import React, { Component } from 'react';
import HabitItem from './HabitItem'

class Habit extends Component {
  /**
   * When a habit mounts for each entry in a habit display habit item
  */
  constructor(props){
    super(props)
    this.state = {
      color: 'black'
    }
  }

  componentDidMount(){
    this.updateHabitColor()
  }

  updateHabitColor(){
    const {target, completed} = this.props.habit
    const canComplete = this.props.monthDaysLeft - (target - completed) // 10 - 15 = -5

    console.log(canComplete)
    if(canComplete <= 0){
      this.setState({color: 'red'})
    }
    else if(canComplete === 0 || canComplete <= 2){
      this.setState({color: 'orange'})
    }else{
      this.setState({color: 'black'})
    }
  }

  onCompleted(index){
    let {id, completed} = this.props.habit
    console.log('Habit ', index, completed)
    if(index <= completed){
      console.log('Deselected a habit')
      this.props.onHabitItemUpdated(id, completed - 1);
    }else{
      console.log('Selected a habit')
      this.props.onHabitItemUpdated(id, completed + 1)
    }
    this.updateHabitColor()
  }

  render() {
    const {id, name, description, category, target, completed} = this.props.habit;
    const habitItemElements = Array(target).fill().map((_, i) => <HabitItem key={i+1} index={i+1} completed={completed} onCompleted={this.onCompleted.bind(this)} />);

    return (
      <div className="row mt-3 mb-3">
        <div className="col-2">
          <h5>{name}</h5>
          {/* <p>Description: {description}</p>
          <p>Category: {category}</p> */}
        </div>
        <div className="col-7">
          {habitItemElements}
        </div>
        <div className="col-2">
          <p style={{color: this.state.color}}>{target - completed} Days left</p>
        </div>
        <div className="col-1">
          <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(id)}>X</button>
        </div>
      </div>
    );
  }
}

export default Habit;
