import React, { Component } from 'react';
import Todo from './TodoHook';

class Todolist extends Component {
  render() {
    let todoItems = [];
    for (let key in this.props.todos) {
      let todo = this.props.todos[key];
      todoItems.push(<Todo key={todo.key} todo={todo} />);
    }
    return(<div className="Todolist">{todoItems}</div>);
  }
}

export default Todolist;
