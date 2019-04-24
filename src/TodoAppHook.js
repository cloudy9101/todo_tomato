import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TodoForm from './TodoFormHook';
import Todolist from './TodoListHook';
import Api from './Api';
import './TodoApp.css';

function TodoApp(props) {
  const [isSignin, setIsSignin] = useState(true);
  const [todos, setTodos] = useState({});

  useEffect(() => {
    Api.fetchTodos((data) => {
      let tmp = {};
      data.reduce((todos, todoData) => {
        let todo = buildTodoData(todoData);
        todos[todo.key] = todo;
        return todos;
      }, tmp);
      setTodos(tmp);
    }, (data) => {
      console.log(data);
      setIsSignin(false);
    });
  }, []);

  let uncompletedTodos = {};
  let completedTodos = {};
  for (let key in todos) {
    let todo = todos[key];
    if(todo.deletedAt === null) {
      if(todo.completedAt === null) {
        uncompletedTodos[key] = todo;
      } else {
        completedTodos[key] = todo;
      }
    }
  }

  if (isSignin) {
    return(
      <div className="TodoApp container">
        <TodoForm appendTodo={appendTodoHandler(todos, setTodos)} />
        <div className="todolist uncompleted-todos">
          <Todolist todos={uncompletedTodos} />
        </div>
        <div className="todolist completed-todos">
          <Todolist todos={completedTodos} />
        </div>
        <div className="row links">
          <div className="col-md-2">
            <Link to="/trash">Trash</Link>
          </div>
          <div className="col-md-8">
          </div>
          <div className="col-md-2">
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return(<Redirect to="/signin" />);
  }
}

function appendTodoHandler(todos, setTodos) {
  return (todoData) => {
    const todo = buildTodoData(todoData);
    setTodos(
      Object.assign(
        {},
        todos,
        {[todo.key]: todo}
      )
    );
  }
}

function buildTodoData(todo) {
  return { "key": todo.id, "name": todo.name, "completedAt": todo.completed_at,
           "deletedAt": todo.deleted_at, "tomatos": todo.tomatos || 0 };
};

export default TodoApp;
