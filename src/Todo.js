import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.interval = 25 * 60;
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = { duration: null, intervalId: null };
  }

  handleClick(key, e) {
    this.props.toggleTodoCompleted(key);
  }

  handleDelete(key, e) {
    this.props.deleteTodo(key);
  }

  handleStart(key, e) {
    this.props.startTomato(key);
  }

  handleDrop(key, e) {
    this.props.dropTomato(key);
  }

  notifyStop(key) {
    alert('stop');
  }

  handleFinish(key, e) {
    this.props.finishTomato(key);
  }

  render() {
    const todo = this.props.todo;
    let buttons = null;
    let duration = null;
    let completedBtn = null;
    if (this.props.currentTodoKey === todo.key) {
      duration = this.props.duration;
    }
    if (todo.active) {
      if (duration != null) {
        if (duration < this.interval) {
          buttons = <span>
            <span className="duration">
              {duration}
            </span>
            <a onClick={this.handleDrop.bind(this, todo.key)}><i className="fas fa-times"></i></a>
            <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        } else {
          buttons = <span>
            <span className="duration">
              {duration}
            </span>
            <a onClick={this.handleFinish.bind(this, todo.key)}><i className="fas fa-check"></i></a>
            <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        }
      } else {
        if (todo.completed) {
          buttons = <span>
              <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        } else {
          buttons = <span>
              <a onClick={this.handleStart.bind(this, todo.key)}><i className="fas fa-play"></i></a>
              <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        }
      }
    } else {
      buttons = <span>
        <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-undo-alt"></i></a>
        </span>
    }
    if (todo.completed) {
      completedBtn = <i className="complete-icon fas fa-check"></i>
    } else {
      completedBtn = <i className="complete-icon far fa-circle"></i>
    }
    return(
      <div className={"todo-group Todo-" + (todo.completed ? "completed" : "uncompleted") + " Todo-" + (todo.active ? "active" : "inactive")}>
        <a onClick={this.handleClick.bind(this, todo.key)}>
          {completedBtn}
        </a>
        <div className="todo-item">
          <span className="Todo">{todo.name}</span>
          <div className="buttons">
            {buttons}
            <span className="tomatos">
              <i className="fa fa-lemon"></i>
              {todo.tomatos}
            </span>
          </div>
        </div>
      </div>);
  }
}

export default Todo;
