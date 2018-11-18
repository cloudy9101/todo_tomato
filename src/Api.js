const gateway = 'http://localhost:4000';

const Api = {
  fetchTodos: (cb) => {
    fetch(gateway + '/todos')
      .then(results => {
        return results.json();
      }).then(data => {
        cb(data);
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
      return results.json();
    }).then(data => {
      cb(data);
    });
  }
};

export default Api;
