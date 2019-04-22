import React, { useState, useEffect } from 'react';

import Api from './Api';
import './Todo.css';

function Todo(props) {
  const todo = props.todo;
  const complete = useComplete(todo.completedAt != null, todo.key);
  const active = useActive(todo.deletedAt === null, todo.key);
  const [duration, setDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [tomatos, setTomatos] = useState(todo.tomatos);
  const [startAt, setStartAt] = useState(null);

  const clearDuration = getClearDuration(setDuration, intervalId, setIntervalId);
  const startTomatoBtn = <a onClick={() => startTomato(setDuration, setIntervalId, setStartAt)}><i className="fas fa-play"></i></a>;
  const dropTomatoBtn =  <a onClick={() => clearDuration()}><i className="fas fa-times"></i></a>;
  const finishTomatoBtn =  <a onClick={() => finishTomato(todo.key, startAt, setTomatos, clearDuration)}><i className="fas fa-check"></i></a>;
  let tomatoBtns = null;
  if(active.value && !complete.value && intervalId && duration > 10) {
    tomatoBtns = finishTomatoBtn;
  } else if (active.value && !complete.value && intervalId) {
    tomatoBtns = dropTomatoBtn;
  } else if (active.value && !complete.value) {
    tomatoBtns = startTomatoBtn;
  }
  let durationText = null;
  if (active.value && !complete.value && intervalId) {
    durationText = <span className="duration">{Math.round(duration / 60)}" {duration % 60}'</span>
  }

  return (
    <div className={"todo-group Todo-" + (complete.value ? "completed" : "uncompleted") + " Todo-" + (active.value ? "active" : "inactive")}>
      {completeBtn(complete)}
      <div className="todo-wrapper">
        <div className="todo-item">
          <span className="Todo">{todo.name}</span>
          <div className="buttons">
            <span>
              {durationText}
              {tomatoBtns}
              {trashBtn(active)}
            </span>
            <span className="tomatos">
              <i className="fa fa-lemon"></i>
              {tomatos}
            </span>
          </div>
        </div>
      </div>
      </div>
  );
}

function completeBtn(complete) {
  const completedBtn = <i className="complete-icon completed fas fa-check"></i>;
  const uncompletedBtn = <i className="complete-icon far fa-circle"></i>;
  return(<a onClick={complete.onChange}>
           {complete.value ? uncompletedBtn : completedBtn}
         </a>)
}

function trashBtn(active) {
  const deleteBtn = <a onClick={active.onChange}><i className="fas fa-trash-alt"></i></a>;
  const recoverBtn = <a onClick={active.onChange}><i className="fas fa-undo-alt"></i></a>;

  return active.value ? deleteBtn : recoverBtn;
}

function startTomato(setDuration, setIntervalId, setStartAt) {
  const startAt = Date.now();
  setStartAt(startAt);
  setIntervalId(setInterval(() => {
    setDuration(Math.round((Date.now() - startAt) / 1000));
  }, 1000));
}

function finishTomato(key, startAt, setTomatos, clearDuration) {
  const endAt = Date.now();
  Api.finishTomato(key, startAt, endAt, (data) => {
    setTomatos(data.tomatos);
    clearDuration();
  });
}

function getClearDuration(setDuration, intervalId, setIntervalId) {
  return () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setDuration(0);
  }
}

function useActive(initial, key) {
  const [active, setActive] = useState(initial);
  return {
    value: active,
    onChange: () => {
      if(active) {
        Api.destroyTodo(key, (data) => {
          setActive(false);
        });
      } else {
        Api.recoverTodo(key, (data) => {
          setActive(true);
        });
      }
    }
  };
}

function useComplete(initial, key) {
  const [complete, setComplete] = useState(initial);
  return {
    value: complete,
    onChange: () => {
      if(complete) {
        Api.uncompleteTodo(key, (data) => {
          setComplete(false);
        });
      } else {
        Api.completeTodo(key, (data) => {
          setComplete(true);
        });
      }
    }
  };
}

export default Todo;
