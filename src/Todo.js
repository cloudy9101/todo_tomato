import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeTodo, uncompleteTodo, deleteTodo, startTomato, dropTomato, finishTomato } from './actions';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleClick(key, e) {
    if (this.props.todo.completedAt === null) {
      this.props.completeTodo(key);
    } else {
      this.props.uncompleteTodo(key);
    }
  }

  handleDelete(key, e) {
    this.props.deleteTodo(key);
  }

  handleStart(key, e) {
    this.props.startTomato(key);
  }

  handleDrop(e) {
    clearInterval(this.props.tomatoStatus.intervalId);
    this.props.dropTomato();
  }

  handleFinish(key, e) {
    clearInterval(this.props.tomatoStatus.intervalId);
    this.props.finishTomato(key, this.props.tomatoStatus.tomatoStartAt);
  }

  render() {
    const todo = this.props.todo;
    let buttons = null;
    let duration = null;
    let progressPercentage = null;
    let completedBtn = null;
    let progressBar = null;
    if (this.props.tomatoStatus.tomatoTodoKey === todo.key) {
      duration = this.props.tomatoStatus.tomatoDuration;
      progressPercentage = duration / this.props.tomatoStatus.timeLength;
    }
    if (todo.deletedAt === null) {
      if (duration != null) {
        if (duration < this.props.tomatoStatus.timeLength) {
          buttons = <span>
            <span className="duration">
              {Math.round(duration / 60)}" {duration % 60}'
            </span>
            <a onClick={this.handleDrop.bind(this)}><i className="fas fa-times"></i></a>
            <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        } else {
          buttons = <span>
            <span className="duration">
              {Math.round(duration / 60)}" {duration % 60}'
            </span>
            <a onClick={this.handleFinish.bind(this, todo.key)}><i className="fas fa-check"></i></a>
            <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        }
      } else {
        if (todo.completedAt != null) {
          buttons = <span>
              <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        } else {
          buttons = <span>
              <a onClick={this.handleStart.bind(this, todo.key)}><i className="fas fa-play"></i></a>
              <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-trash-alt"></i></a>
            </span>
        }
      }
    } else {
      buttons = <span>
        <a onClick={this.handleDelete.bind(this, todo.key)}><i className="fas fa-undo-alt"></i></a>
        </span>
    }
    if (todo.completedAt != null) {
      completedBtn = <i className="complete-icon completed fas fa-check"></i>
    } else {
      completedBtn = <i className="complete-icon far fa-circle"></i>
    }
    if(duration != null) {
      let progressStyle = { width: progressPercentage * 100 + "%" };
      progressBar = <div className="progress" style={{height: 1}}>
          <div className="progress-bar bg-success" role="progressbar" style={progressStyle}
            aria-valuenow={Math.round(progressPercentage)} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    }
    return(
      <div className={"todo-group Todo-" + (todo.completedAt != null ? "completed" : "uncompleted") + " Todo-" + (todo.deletedAt != null ? "inactive" : "active")}>
        <a onClick={this.handleClick.bind(this, todo.key)}>
          {completedBtn}
        </a>
        <div className="todo-wrapper">
          <div className="todo-item">
            <span className="Todo">{todo.name}</span>
            <div className="buttons">
              {buttons}
              <span className="tomatos">
                <i className="fa fa-lemon"></i>
                {todo.tomatos}
              </span>
            </div>
          </div>
          {progressBar}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todos, tomatoStatus: state.tomatoStatus }
};
const mapDispatchToProps = { completeTodo, uncompleteTodo, deleteTodo, startTomato, dropTomato, finishTomato };

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
