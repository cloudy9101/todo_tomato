import Api from './Api';

export const FETCH_TODOS = "FETCH_TODOS";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR";

export const APPEND_TODO = "APPEND_TODO";
export const APPEND_TODO_SUCCESS = "APPEND_TODO_SUCCESS";
export const APPEND_TODO_ERROR = "APPEND_TODO_ERROR";

export const COMPLETE_TODO = "COMPLETE_TODO";
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS";
export const COMPLETE_TODO_ERROR = "COMPLETE_TODO_ERROR";

export const UNCOMPLETE_TODO = "UNCOMPLETE_TODO";
export const UNCOMPLETE_TODO_SUCCESS = "UNCOMPLETE_TODO_SUCCESS";
export const UNCOMPLETE_TODO_ERROR = "UNCOMPLETE_TODO_ERROR";

export const DELETE_TODO = "DELETE_TODO";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";

export const START_TOMATO = "START_TOMATO";
export const START_TOMATO_SUCCESS = "START_TOMATO_SUCCESS";
export const SET_DURATION = "SET_DURATION";
export const DROP_TOMATO = "DROP_TOMATO";
export const FINISH_TOMATO = "FINISH_TOMATO";
export const FINISH_TOMATO_SUCCESS = "FINISH_TOMATO_SUCCESS";
export const FINISH_TOMATO_ERROR = "FINISH_TOMATO_ERROR";

export const fetchTodos = () => {
  return (dispatch) => {
      return Api.fetchTodos((data) => {
        let todos = data.reduce((todos, todoData) => {
          console.log(todos);
          let todo = buildTodoData(todoData);
          todos[todo.key] = todo;
          return todos;
        }, {});
        dispatch(fetchTodosSuccess(todos));
      }, (data) => {
        dispatch(fetchTodosError);
      });
  };
};
export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: { todos: todos }
});
export const fetchTodosError = () => ({type: FETCH_TODOS_ERROR});

export const appendTodo = (name) => {
  return (dispatch) => {
    Api.createTodo(name, (data) => {
      if(data.errors === undefined) {
        dispatch(appendTodoSuccess(buildTodoData(data)));
      } else {
        console.log(data.errors);
      }
    });
  };
};
export const appendTodoSuccess = (data) => ({type: APPEND_TODO_SUCCESS, payload: { data }});
export const appendTodoError = () => ({type: APPEND_TODO_ERROR});

export const completeTodo = (key) => {
  return (dispatch) => {
    Api.completeTodo(key, (data) => {
      dispatch(completeTodoSuccess(key));
    });
  };
};
export const completeTodoSuccess = (key) => ({type: COMPLETE_TODO_SUCCESS, payload: {key}});
export const completeTodoError = (key) => ({type: COMPLETE_TODO_ERROR, payload: {key}});

export const uncompleteTodo = (key) => {
  return (dispatch) => {
    Api.uncompleteTodo(key, (data) => {
      dispatch(uncompleteTodoSuccess(key));
    });
  };
};
export const uncompleteTodoSuccess = (key) => ({type: UNCOMPLETE_TODO_SUCCESS, payload: {key}});
export const uncompleteTodoError = (key) => ({type: UNCOMPLETE_TODO_ERROR, payload: {key}});

export const deleteTodo = (key) => {
  return (dispatch) => {
    Api.destroyTodo(key, (data) => {
      dispatch(deleteTodoSuccess(key));
    });
  };
};
export const deleteTodoSuccess = (key) => ({type: DELETE_TODO_SUCCESS, payload: {key}});
export const deleteTodoError = (key) => ({type: DELETE_TODO_ERROR, payload: {key}});

export const startTomato = (key) => {
  return (dispatch) => {
    let intervalId = setInterval(() => {
      dispatch(setDuration());
    }, 1000);
    dispatch(startTomatoSuccess(key, intervalId));
  };
};
export const startTomatoSuccess = (key, intervalId) => ({type: START_TOMATO_SUCCESS, payload: {key, intervalId}});
export const setDuration = () => ({type: SET_DURATION});
export const dropTomato = () => ({type: DROP_TOMATO});
export const finishTomato = (key, startAt) => {
  return (dispatch) => {
    let endAt = Date.now();
    Api.finishTomato(key, startAt, endAt, (data) => {
      console.log(data);
      dispatch(finishTomatoSuccess(data.todo_id, data.tomatos));
    });
  }
}
export const finishTomatoSuccess = (key, tomatoCount) => ({type: FINISH_TOMATO_SUCCESS, payload: {key, tomatoCount}});

const buildTodoData = (todo) => {
  return { "key": todo.id, "name": todo.name, "completedAt": todo.completed_at,
           "deletedAt": todo.deleted_at, "tomatos": todo.tomatos || 0 };
};

