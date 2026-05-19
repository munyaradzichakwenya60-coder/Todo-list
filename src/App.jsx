import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import NotificationManager from './components/NotificationManager';

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  const toggleTaskComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5', // Flat solid background color
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        My Todo List
      </h1>
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: '#FFF', // Flat solid component background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <TodoForm onAddTask={addTask} />
        <TodoList todos={todos} onToggleComplete={toggleTaskComplete} />
      </div>

      <NotificationManager todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
