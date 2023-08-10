import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [editedTodoId, setEditedTodoId] = useState(null)
  const [editedTodoText, setEditedTodoText] = useState('')

  const addTodo = (event) => {
    event.preventDefault()
    const todoText = event.target.todoText.value
    if (todoText.trim() !== '') {
      const newTodo = { id: Date.now(), todo: todoText }
      setTodos([...todos, newTodo])
      event.target.todoText.value = ''
    }
  }

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(item => item.id !== id)
    setTodos(filteredTodos)
  }

  const startEditing = (id, text) => {
    setEditedTodoId(id)
    setEditedTodoText(text)
  }

  const cancelEditing = () => {
    setEditedTodoId(null)
    setEditedTodoText('')
  }

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, todo: editedTodoText } : item
    )
    setTodos(updatedTodos)
    setEditedTodoId(null)
    setEditedTodoText('')
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input type="text" id="todoText" placeholder="Enter your todo" />
        <button className='btn'>Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map(item => (
          <li key={item.id} className="todo-item">
            {editedTodoId === item.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  className="edit-input"
                />
                <button className='btn' onClick={() => saveEditedTodo(item.id)}>Save</button>
                <button className='btn-red' onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                {item.todo}
                <button className='btn-red' onClick={() => deleteTodo(item.id)}>Delete</button>
                <button className='btn' onClick={() => startEditing(item.id, item.todo)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
