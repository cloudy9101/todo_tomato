import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './TodoApp.css';
import TodoForm from './TodoForm';
import Todolist from './Todolist';
import Api from './Api';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      uncompletedTodos: [],
      completedTodos: [],
    };

    this.activeTodos = this.activeTodos.bind(this);
    this.completedTodos = this.completedTodos.bind(this);
    this.uncompletedTodos = this.uncompletedTodos.bind(this);

    this.toggleTodoCompleted = this.toggleTodoCompleted.bind(this);
    this.appendTodo = this.appendTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.startTomato = this.startTomato.bind(this);
    this.dropTomato = this.dropTomato.bind(this);
    this.finishTomato = this.finishTomato.bind(this);
  }

  componentWillMount() {
    Api.fetchTodos((data) => {
      if (data.status === 403) {
        this.setState({status: 403});
      } else {
        let todos = data.map((todo) => {
          return this.buildTodoData(todo);
        });
        this.setState({todos: todos, status: 200});
      }
    });
  }

  buildTodoData(todo) {
    return { "key": todo.id, "name": todo.name, "completedAt": todo.completed_at,
             "deletedAt": todo.deleted_at, "tomatos": todo.tomatos };
  }

  activeTodos() {
    return this.state.todos.filter((todo) =>
      todo.deletedAt === null
    );
  }

  uncompletedTodos() {
    return this.activeTodos().filter((todo) =>
      todo.completedAt === null
    );
  }

  completedTodos() {
    return this.activeTodos().filter((todo) =>
      todo.completedAt != null
    );
  }

  toggleTodoCompleted(key) {
    let todo = this.state.todos.find((todo) => {
      return todo.key === key;
    });
    if(todo.completedAt != null) {
      Api.uncompleteTodo(key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.completedAt = null; }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    } else {
      Api.completeTodo(key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.completedAt = Date.now(); }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    }
  }

  appendTodo(name) {
    Api.createTodo(name, (data) => {
      if(data.errors === undefined) {
        let todos = this.state.todos;
        todos.push(this.buildTodoData(data));
        this.setState({"todos": todos});
      } else {
        console.log(data.errors);
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
            if(todo.key === key) { todo.deletedAt = Date.now(); }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    } else {
      Api.recoverTodo(todo.key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.deletedAt = null; }
            return todo;
          });
          this.setState({"todo": todos});
        }
      });
    }
  }

  startTomato(key) {
    if (this.state.intervalId != null) {
      clearInterval(this.state.intervalId);
    }
    this.setState({currentTodoKey: null, intervalId: null, startAt: null});
    const date = new Date();
    const startAt = date.getTime();
    let intervalId = setInterval(() => {
      let duration = Math.round(((new Date()).getTime() - startAt) / 1000);
      this.setState({duration: duration});
    }, 1000);
    this.setState({currentTodoKey: key, intervalId: intervalId, startAt: startAt});
  }

  dropTomato(key) {
    if (this.state.intervalId != null) {
      clearInterval(this.state.intervalId);
    }
    this.setState({currentTodoKey: null, intervalId: null, startAt: null});
  }

  finishTomato(key) {
    clearInterval(this.state.intervalId);
    let endAt = (new Date()).getTime();
    Api.finishTomato(key, this.state.startAt, endAt, (data) => {
      let todos = this.state.todos.map((todo) => {
        if(todo.key === key) { todo.tomatos = data.tomatos; }
        return todo;
      });
      this.setState({currentTodoKey: null, intervalId: null, startAt: null, todos: todos});
    });
  }

  render() {
    if (this.state.status === 403) {
      return(<Redirect to="/signin" />);
    } else {
      return(
        <div className="TodoApp container">
          <TodoForm appendTodo={this.appendTodo} />
          <div className="todolist uncompleted-todos">
            <Todolist todos={this.uncompletedTodos()} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} dropTomato={this.dropTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
          </div>
          <div className="todolist completed-todos">
            <Todolist todos={this.completedTodos()} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} dropTomato={this.dropTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
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
    }
  }
}

export default TodoApp;
