import React, { Component } from 'react';
import { Tasks } from '../../../api/tasks';
import './Task.css';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    /*Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });*/
    Meteor.call('taskMethods.setChecked', this.props.task._id, !this.props.task.checked);
  }
  deleteThisTask() {
    //Tasks.remove(this.props.task._id);
    Meteor.call('taskMethods.remove', this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (<div align="center">
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        <span className="text">{this.props.task.username}</span>
        <span className="text">{this.props.task.taskName}</span>
      </li>
      </div>);
  }
}
