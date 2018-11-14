import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { "page": "Todo" }
  }

  render() {
    let page = "";
    if(this.state.page === "Todo"){
      page = <TodoApp />
    } else {
      page = "" // Todo
    }
    return(
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
