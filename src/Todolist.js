import React, { Component } from 'react';
import Todo from './Todo';

class Todolist extends Component {
  render() {
    let todoItems = [];
    console.log(this.props);
    for (let key in this.props.todos) {
      let todo = this.props.todos[key];
      todoItems.push(<Todo key={todo.key} todo={todo} />);
    }
    return(<div className="Todolist">{todoItems}</div>);
  }
}

export default Todolist;
