import React, { Component } from 'react';
import Todo from './Todo';

class Todolist extends Component {
  render() {
    const todos = this.props.todos;
    const todoItems = todos.map((todo) =>
      <Todo key={todo.key} todo={todo} toggleTodoCompleted={this.props.toggleTodoCompleted} deleteTodo={this.props.deleteTodo} />
    );
    return(<div className="Todolist">{todoItems}</div>);
  }
}

export default Todolist;
