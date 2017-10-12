import React, { Component } from 'react';
import HabitItem from './HabitItem'

class Habit extends Component {
  /**
   * When a habit mounts for each entry in a habit display habit item
  */
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
  }

  render() {
    const {id, name, description, category, target, completed} = this.props.habit;
    const habitItemElements = Array(target).fill().map((_, i) => <HabitItem key={i+1} index={i+1} completed={completed} onCompleted={this.onCompleted.bind(this)} />);

    return (
      <div className="row">
        <div className="col-md-4">
          <h3>{name}</h3>
          {/* <p>Description: {description}</p>
          <p>Category: {category}</p> */}
        </div>
        <div className="col-md-5">
          {habitItemElements}
        </div>
        <div className="col-md-2">
          <p>{completed} / {target} Days</p>
        </div>
        <div className="col-md-1">
          <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(id)}>X</button>
        </div>
      </div>
    );
  }
}

export default Habit;
