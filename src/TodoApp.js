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
      deletedTodos: []
    };

    this.toggleTodoCompleted = this.toggleTodoCompleted.bind(this);
    this.appendTodo = this.appendTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.startTomato = this.startTomato.bind(this);
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
    let deletedTodos = this.state.todos.filter((todo) =>
      todo.active === false
    );
    this.setState({
      uncompletedTodos: uncompletedTodos,
      completedTodos: completedTodos,
      deletedTodos: deletedTodos
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
        todos.push({"key": data.id, "name": data.name, "completed": data.completed, "active": !data.deleted});
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
        <div className="TodoApp">
          <TodoForm appendTodo={this.appendTodo} />
          <h3>Active Uncompleted</h3>
          <Todolist todos={this.state.uncompletedTodos} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
          <h3>Active Completed</h3>
          <Todolist todos={this.state.completedTodos} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
          <h3>Deleted</h3>
          <Todolist todos={this.state.deletedTodos} toggleTodoCompleted={this.toggleTodoCompleted} deleteTodo={this.deleteTodo} startTomato={this.startTomato} finishTomato={this.finishTomato} currentTodoKey={this.state.currentTodoKey} duration={this.state.duration} />
          <Link to="/logout">Logout</Link>
        </div>
      );
    }
  }
}

export default TodoApp;
