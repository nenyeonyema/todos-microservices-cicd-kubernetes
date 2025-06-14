import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API;


function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post(API, { title });
    setTitle('');
    fetchTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Todo List</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(({ _id, title, completed }) => (
          <li key={_id}>
            <span
              onClick={() => toggleTodo(_id, completed)}
              style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {title}
            </span>
            <button onClick={() => deleteTodo(_id)} style={{ marginLeft: '1rem' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
