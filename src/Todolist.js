import React, { Component } from 'react';
import Todo from './Todo';

class Todolist extends Component {
  render() {
    const todos = this.props.todos;
    const todoItems = todos.map((todo) =>
      <Todo key={todo.key} todo={todo} toggleTodoCompleted={this.props.toggleTodoCompleted} deleteTodo={this.props.deleteTodo} startTomato={this.props.startTomato} finishTomato={this.props.finishTomato} currentTodoKey={this.props.currentTodoKey} duration={this.props.duration} />
    );
    return(<div className="Todolist">{todoItems}</div>);
  }
}

export default Todolist;
