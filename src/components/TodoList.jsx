import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleComplete }) {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f9f9f9', // Flat solid color
        borderRadius: '8px',
        minHeight: '100px',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '15px' }}>Your Tasks</h2>
      {todos.length === 0 ? (
        <p style={{ color: '#666' }}>No tasks yet. Add one above!</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
