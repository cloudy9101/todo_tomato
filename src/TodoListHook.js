import React from 'react';
import Todo from './TodoHook';

function Todolist(props) {
  let todoItems = [];
  for (let key in props.todos) {
    let todo = props.todos[key];
    todoItems.push(<Todo key={todo.key} todo={todo} />);
  }

  return(
    <div className="Todolist">{todoItems}</div>
  )
}

export default Todolist;
