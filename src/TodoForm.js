import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { "value": "" }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({"value": e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.appendTodo(this.state.value);
    this.setState({"value": ""})
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder="Task title" aria-label="Task title" aria-describedby="basic-addon1" />
          <div className="input-group-append" id="button-addon4">
            <button className="btn btn-outline-secondary" type="button">Add</button>
          </div>
        </div>
      </form>
    );
  }
}

export default TodoForm;
