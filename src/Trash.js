import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Trash.css';
import Todolist from './Todolist';
import Api from './Api';

class Trash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentWillMount() {
    Api.fetchTodos((data) => {
      if (data.status === 403) {
        this.setState({status: 403});
      } else {
        let todos = data.filter((todo) =>
          todo.deleted
        ).map((todo) => {
          return { "key": todo.id, "name": todo.name, "completed": todo.completed, "active": !todo.deleted, "tomatos": todo.tomatos };
        });
        this.setState({todos: todos, status: 200});
      }
    });
  }

  deleteTodo(key) {
    let todo = this.state.todos.find((todo) => {
      return todo.key === key;
    });
    if(todo.active) {
      Api.destroyTodo(todo.key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.active = false; }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    } else {
      Api.recoverTodo(todo.key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.active = true; }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    }
  }

  render() {
    if (this.state.status === 403) {
      return(<Redirect to="/signin" />);
    } else {
      return(
        <div className="Trash container">
          <div className="todolist deleted-todos">
            <Todolist todos={this.state.todos} deleteTodo={this.deleteTodo} />
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
    }
  }
}

export default Trash;
