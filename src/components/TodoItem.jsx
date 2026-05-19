import React, { useState, useEffect } from 'react';

function TodoItem({ todo, onToggleComplete }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const deadline = new Date(todo.deadline);
    const difference = deadline - now; // Difference in milliseconds

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, overdue: true };
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)));

    return { hours, minutes, seconds, overdue: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [todo.deadline]);

  const { hours, minutes, seconds, overdue } = timeLeft;

  const getTimerColor = () => {
    if (todo.completed) return '#9E9E9E'; // Gray for completed
    if (overdue) return '#F44336'; // Red for overdue
    return '#03A9F4'; // Energetic Sky Blue for active timer
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: todo.completed ? '#E0E0E0' : '#FFF', // Flat solid color
        border: '1px solid #ddd',
        borderRadius: '4px',
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: '#333',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          style={{
            transform: 'scale(1.5)',
            accentColor: '#03A9F4', // Energetic Sky Blue for checkbox accent
          }}
        />
        <span style={{ fontWeight: 'bold' }}>{todo.text}</span>
        <span style={{ fontSize: '0.8em', color: '#666' }}>
          (Deadline: {new Date(todo.deadline).toLocaleString()})
        </span>
      </div>
      <div
        style={{
          fontWeight: 'bold',
          color: getTimerColor(),
          padding: '5px 10px',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0', // Slight contrast
        }}
      >
        {overdue ? 'OVERDUE' : `${hours}h ${minutes}m ${seconds}s`}
      </div>
    </div>
  );
}

export default TodoItem;
