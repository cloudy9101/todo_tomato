const gateway = '/api';

const Api = {
  fetchTodos: (cb, err) => {
    fetch(gateway + '/todos', {
      credentials: 'include'
    }).then(results => {
      if (results.ok) {
        return results.json();
      } else if (results.status === 403) {
        return { status: 403 };
      }
    }).then(data => {
      if(data.status === 403) {
        err(data);
      } else {
        cb(data);
      }
    });
  },
  fetchDeletedTodos: (cb, err) => {
    fetch(gateway + '/todos?active=false', {
      credentials: 'include'
    }).then(results => {
      console.log(results);
      if (results.ok) {
        return results.json();
      } else if (results.status === 403) {
        return { status: 403 };
      }
    }).then(data => {
      if(data.status === 403) {
        err(data);
      } else {
        cb(data);
      }
    });
  },
  createTodo: (name, cb) => {
    fetch(gateway + '/todos', {
      body: JSON.stringify({name: name}),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  },
  completeTodo: (id, cb) => {
    fetch(gateway + '/todos/' + id + '/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  },
  uncompleteTodo: (id, cb) => {
    fetch(gateway + '/todos/' + id + '/completions', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  },
  destroyTodo: (id, cb) => {
    fetch(gateway + '/todos/' + id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  },
  recoverTodo: (id, cb) => {
    fetch(gateway + '/todos/' + id + '/recoveries', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  },
  signin: (data, cb) => {
    let email = data.email;
    let password = data.password;
    fetch(gateway + '/signin', {
      body: JSON.stringify({email: email, password: password}),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      cb(results);
    });
  },
  signup: (data, cb) => {
    let email = data.email;
    let password = data.password;
    let passwordConfirmation = data.passwordConfirmation;
    fetch(gateway + '/signup', {
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(results => {
      cb(results);
    });
  },
  logout: (cb) => {
    fetch(gateway + '/logout', {
      method: 'DELETE',
    }).then(results => {
      cb(results);
    });
  },
  finishTomato: (id, start_at, end_at, cb) => {
    fetch(gateway + '/todos/' + id + '/tomatos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({start_at: start_at, end_at: end_at})
    }).then(results => {
      return results.json();
    }).then(data => {
      cb(data);
    });
  }
};

export default Api;
