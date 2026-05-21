import React, { useState } from 'react';

function TodoForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim() || !deadline) return;

    onAddTask({
      id: Date.now().toString(),
      text: taskText,
      deadline: new Date(deadline).toISOString(), // Store as ISO string
      completed: false,
      notified: false,
    });
    setTaskText('');
    setDeadline('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#1A237E', // Deep Dark Blue for form container
        borderRadius: '8px',
        margin: '20px 0',
      }}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff',
          color: '#333',
        }}
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff',
          color: '#333',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          backgroundColor: '#03A9F4', // Energetic Sky Blue for button
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
