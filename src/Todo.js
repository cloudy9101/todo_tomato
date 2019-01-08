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
    if (this.props.currentTodoKey === todo.key) {
      duration = this.props.duration;
    }
    if (todo.active) {
      if (duration != null) {
        if (duration < this.interval) {
          buttons = <span>
            {" | "}{duration}
            {" | "}<a onClick={this.handleDelete.bind(this, todo.key)}>{todo.active ? "del" : "recover"}</a>
            </span>
        } else {
          buttons = <span>
            {" | "}{duration}{" "}<a onClick={this.handleFinish.bind(this, todo.key)}>finish</a>
            {" | "}<a onClick={this.handleDelete.bind(this, todo.key)}>{todo.active ? "del" : "recover"}</a>
            </span>
        }
      } else {
        buttons = <span>
          {" | "}<span onClick={this.handleStart.bind(this, todo.key)}>start</span>
          {" | "}<a onClick={this.handleDelete.bind(this, todo.key)}>{todo.active ? "del" : "recover"}</a>
          </span>
      }
    } else {
      buttons = <span>
        {" | "}<a onClick={this.handleDelete.bind(this, todo.key)}>{todo.active ? "del" : "recover"}</a>
        </span>
    }
    return(
      <div>
        <span className={"Todo Todo-" + (todo.completed ? "completed" : "uncompleted") } onClick={this.handleClick.bind(this, todo.key)}>{todo.name}</span>
        {buttons}
        {" | "}
        {todo.tomatos}
      </div>);
  }
}

export default Todo;
