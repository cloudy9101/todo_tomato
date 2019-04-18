import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './TodoApp.css';
import TodoForm from './TodoForm';
import Todolist from './Todolist';
import Api from './Api';

import { fetchTodos } from './actions';

class TodoApp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    if (this.props.status === 403) {
      return(<Redirect to="/signin" />);
    } else {
      return(
        <div className="TodoApp container">
          <TodoForm />
          <div className="todolist uncompleted-todos">
            <Todolist todos={this.props.uncompletedTodos} />
          </div>
          <div className="todolist completed-todos">
            <Todolist todos={this.props.completedTodos} />
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

const mapStateToProps = (state) => {
  return {
    completedTodos: state.completedTodos,
    uncompletedTodos: state.uncompletedTodos,
    status: null
  }
};
const mapDispatchToProps = { fetchTodos };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoApp));
