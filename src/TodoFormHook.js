import React, { useState } from 'react';
import Api from './Api';

function TodoForm(props) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Api.createTodo(value, (data) => {
      if(data.errors === undefined) {
        props.appendTodo(data);
        setValue("");
      } else {
        console.log(data.errors);
      }
    });
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input type="text" value={value} onChange={handleChange} className="form-control" placeholder="Task title" aria-label="Task title" aria-describedby="basic-addon1" />
        <div className="input-group-append" id="button-addon4">
          <button className="btn btn-outline-secondary" type="button">Add</button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
