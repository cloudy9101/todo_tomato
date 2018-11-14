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
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TodoForm;
