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
          return { "key": todo.id, "name": todo.name, "completed": todo.completed, "active": !todo.deleted, "tomatos": todo.tomatos };
        });
        this.setState({todos: todos, status: 200});
        this.specifyTodos();
      }
    });
  }

  specifyTodos() {
    let uncompletedTodos = this.state.todos.filter((todo) =>
      todo.active === true && todo.completed === false
    );
    let completedTodos = this.state.todos.filter((todo) =>
      todo.active === true && todo.completed === true
    );
    this.setState({
      uncompletedTodos: uncompletedTodos,
      completedTodos: completedTodos,
    });
  }

  toggleTodoCompleted(key) {
    let todo = this.state.todos.find((todo) => {
      return todo.key === key;
    });
    if(todo.completed) {
      Api.uncompleteTodo(key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.completed = false; }
            return todo;
          });
          this.setState({"todo": todos});
          this.specifyTodos();
        }
      });
    } else {
      Api.completeTodo(key, (data) => {
        if(data.errors === undefined) {
          let todos = this.state.todos.map((todo) => {
            if(todo.key === key) { todo.completed = true; }
            return todo;
          });
          this.setState({"todo": todos});
          this.specifyTodos();
        }
      });
    }
  }

  appendTodo(name) {
    Api.createTodo(name, (data) => {
      if(data.errors === undefined) {
        let todos = this.state.todos;
        todos.push({"key": data.id, "name": data.name, "completed": data.completed, "active": !data.deleted, "tomatos": 0});
        this.setState({"todos": todos});
        this.specifyTodos();
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
            if(todo.key === key) { todo.active = false; }
            return todo;
          });
          this.setState({"todo": todos});
          this.specifyTodos();
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
          this.specifyTodos();
        }
      });
    }
  }

  startTomato(key) {
    // alert('start ' + key);
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
      this.specifyTodos();
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
            <Todolist todos={this.state.uncompletedTodos} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} dropTomato={this.dropTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
          </div>
          <div className="todolist completed-todos">
            <Todolist todos={this.state.completedTodos} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} dropTomato={this.dropTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
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
