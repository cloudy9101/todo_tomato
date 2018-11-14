import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(key, e) {
    this.props.toggleTodoCompleted(key);
  }

  handleDelete(key, e) {
    this.props.deleteTodo(key);
  }

  render() {
    const todo = this.props.todo;
    return(
      <div>
        <span className={"Todo Todo-" + (todo.completed ? "completed" : "uncompleted") } onClick={this.handleClick.bind(this, todo.key)}>{todo.name}</span>
        {" | "}
        <a onClick={this.handleDelete.bind(this, todo.key)}>{todo.active ? "del" : "recover"}</a>
      </div>);
  }
}

export default Todo;
