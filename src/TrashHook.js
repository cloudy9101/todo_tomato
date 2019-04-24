import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Trash.css';
import Todolist from './TodoListHook';
import Api from './Api';

function Trash(props) {
  const [todos, setTodos] = useState({});
  const [isSignin, setIsSignin] = useState(true);

  useEffect(() => {
    Api.fetchDeletedTodos((data) => {
      if (data.status === 403) {
        setIsSignin(false);
      } else {
        console.log(data);
        const tmp = data.map(buildTodoData).filter((todo) => {
          return todo.deletedAt != null;
        });
        setTodos(tmp);
      }
    });
  }, [])

  if (isSignin) {
    return(
      <div className="Trash container">
        <div className="todolist deleted-todos">
          <Todolist todos={todos} />
        </div>
        <div className="row links">
          <div className="col-md-2">
            <Link to="/">Index</Link>
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

function buildTodoData(todo) {
  return { "key": todo.id, "name": todo.name, "completedAt": todo.completed_at,
           "deletedAt": todo.deleted_at, "tomatos": todo.tomatos || 0 };
};

export default Trash;
