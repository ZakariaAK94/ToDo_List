import './index.css'; 
import { useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const count = useRef(0);

  // Add new todo item
  function handleAddTodo() 
  {
    const inputElement = inputRef.current;
    const text = inputElement.value.trim();
    const newItem = { id:count.current, completed: false, text };

    if (!text) 
    {      
      inputElement.classList.add('is-invalid');
      setTimeout(() => inputElement.classList.remove('is-invalid'),
       1000);
      return;
    }

    setTodos([...todos, newItem]);
    inputElement.value = '';
    count.current++;
  }

  // Toggle completion status
  function handleOnClick(currentId)
 {
    const newTodos = [...todos];
    newTodos[currentId].completed = !newTodos[currentId].completed;
    setTodos(newTodos);
  }

  // Delete a single todo item
  function handleDeleteItem(currentId) 
  {
    const newTodos = todos.filter(({id}) => id !== currentId);
    setTodos(newTodos);
  }

  // Clear all todos
  function handleClearTodos() {
    setTodos([]);
    count.current =0; // initial id
  }

  return (
    <div className="App-container">
      <h2>To-Do List</h2>
      <fieldset>
      <input
          type="text"
          className="form-control"
          ref={inputRef}
          placeholder="Enter item..."
        />
        <button className="btn-success" onClick={handleAddTodo}>
          Add
        </button>
      </fieldset>

      <div className='tasks-group'>
        <h3>Pending Tasks</h3>
        <ul>
          {todos
            .filter(({ completed }) => !completed)
            .map(({ text, id}) => (
              <div key={id} className='list-group'>
                <li
                  className="PT-list-group-item"
                  onClick={() => handleOnClick(id)}
                >
                  {text}
                </li>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDeleteItem(id)}
                  aria-label="Delete item"
                >
                  X
                </button>
              </div>
            ))}
        </ul>
      </div>
      
      <div className='tasks-group'>
      <h3 >Completed Tasks</h3>
      <ul>
        {todos
          .filter(({ completed }) => completed)
          .map(({ text, id}) => (
            <div key={id} className="list-group">
              <li
                className="CT-list-group-item"
                onClick={() => handleOnClick(id)}
              >
                {text}
              </li>
              <button
                type="button"
                className="btn-delete"
                onClick={() => handleDeleteItem(id)}
                aria-label="Delete item"
              >
                X
              </button>
            </div>
          ))}
      </ul>
      </div>

      <button className="btn-clear-all" onClick={handleClearTodos}>
        Clear All
      </button>
    </div>
  );
}

export default App;
