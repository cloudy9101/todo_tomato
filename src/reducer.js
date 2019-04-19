import * as actions from './actions';

const initialState = {
  todos: {},
  completedTodos: {},
  uncompletedTodos: {},
  deletedTodos: {},
  tomatoStatus: {
    timeLength: 25 * 60,
    tomatoTodoKey: null,
    tomatoStartAt: null,
    tomatoDuration: null,
    intervalId: null
  }
};

function reducer(state = initialState, action) {
  console.log('reducer', state, action);

  switch(action.type) {
    case actions.FETCH_TODOS_SUCCESS:
      let todos = action.payload.todos;
      let completedTodos = {};
      let uncompletedTodos = {};
      let deletedTodos = {};
      for (let key in todos) {
        let todo = todos[key];
        if(todo.deletedAt === null) {
          if(todo.completedAt === null) {
            uncompletedTodos[key] = todo;
          } else {
            completedTodos[key] = todo;
          }
        } else {
          deletedTodos[key] = todo;
        }
      }

      return Object.assign({}, state, {
        todos: todos,
        completedTodos: completedTodos,
        uncompletedTodos: uncompletedTodos,
        deletedTodos: deletedTodos,
        status: 200
      });
    case actions.FETCH_TODOS_ERROR:
      return Object.assign({}, state, { status: 403 });
    case actions.APPEND_TODO_SUCCESS:
      let todo = action.payload.data;
      return Object.assign({},
        state,
        {
          todos: Object.assign({}, state.todos, {[todo.key]: todo}),
          uncompletedTodos: Object.assign({}, state.uncompletedTodos, {[todo.key]: todo})
        });
    case actions.COMPLETE_TODO_SUCCESS:
      let key = action.payload.key;
      let completedTodo = state.todos[key];
      completedTodo.completedAt = Date.now();
      delete state.uncompletedTodos[key];
      return Object.assign(
        {},
        state,
        {
          todos: Object.assign({}, state.todos, {[action.payload.key]: completedTodo}),
          uncompletedTodos: state.uncompletedTodos,
          completedTodos: Object.assign({}, state.completedTodos, {[action.payload.key]: completedTodo})
        }
      );
    case actions.UNCOMPLETE_TODO_SUCCESS:
      key = action.payload.key;
      let uncompletedTodo = state.todos[key];
      uncompletedTodo.completedAt = null;
      delete state.completedTodos[key];
      return Object.assign(
        {},
        state,
        {
          todos: Object.assign({}, state.todos, {[action.payload.key]: uncompletedTodo}),
          completedTodos: state.completedTodos,
          uncompletedTodos: Object.assign({}, state.uncompletedTodos, {[action.payload.key]: uncompletedTodo})
        }
      );
    case actions.DELETE_TODO_SUCCESS:
      key = action.payload.key;
      let deletedTodo = state.todos[key];
      deletedTodo.deletedAt = Date.now();
      delete state.completedTodos[key];
      delete state.uncompletedTodos[key];
      return Object.assign(
        {},
        state,
        {
          todos: Object.assign({}, state.todos, {[action.payload.key]: deletedTodo}),
          completedTodos: state.completedTodos,
          uncompletedTodos: state.uncompletedTodos,
          deletedTodos: Object.assign({}, state.deletedTodos, {[action.payload.key]: deletedTodo})
        }
      );
    case actions.START_TOMATO_SUCCESS:
      key = action.payload.key;
      return Object.assign(
        {}, state,
        { tomatoStatus: Object.assign({}, state.tomatoStatus,
          {
            tomatoTodoKey: key,
            tomatoStartAt: Date.now(),
            intervalId: action.payload.intervalId
          })
        });
    case actions.SET_DURATION:
      let duration = Math.round((Date.now() - state.tomatoStatus.tomatoStartAt) / 1000);
      return Object.assign(
        {}, state,
        { tomatoStatus: Object.assign({}, state.tomatoStatus, { tomatoDuration: duration }) }
      );
    case actions.DROP_TOMATO:
      return Object.assign(
        {}, state,
        { tomatoStatus: Object.assign({}, state.tomatoStatus,
          {
            tomatoTodoKey: null,
            tomatoStartAt: null,
            tomatoDuration: null,
            intervalId: null
          })
        }
      );
    case actions.FINISH_TOMATO_SUCCESS:
      key = action.payload.key;
      let finishTomatoTodo = state.todos[key];
      finishTomatoTodo.tomatos = action.payload.tomatoCount;
      return Object.assign(
        {}, state,
        {
          todos: Object.assign({}, state.todos, {[key]: finishTomatoTodo}),
          uncompletedTodos: Object.assign({}, state.uncompletedTodos, {[key]: finishTomatoTodo}),
          tomatoStatus:
          {
            tomatoTodoKey: null,
            tomatoStartAt: null,
            tomatoDuration: null,
            intervalId: null
          }
        }
      );

    default:
      return state;
  }
}

export default reducer;
