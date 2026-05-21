import { useEffect } from 'react';

const NOTIFICATION_CHECK_INTERVAL = 5000; // Check every 5 seconds

function NotificationManager({ todos, setTodos }) {
  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let updatedTodos = [...todos];
      let notificationCount = 0;

      todos.forEach((todo, index) => {
        const deadlineTime = new Date(todo.deadline).getTime();

        if (!todo.completed && !todo.notified && now >= deadlineTime) {
          notificationCount++;
          // Mark as notified to prevent repeated alerts/notifications
          updatedTodos[index] = { ...todo, notified: true };

          const message = `Task "${todo.text}" is due NOW or OVERDUE!`;

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Task Reminder', {
              body: message,
              icon: '/clipboard.svg'
           });
          } else {
            // Fallback to window.alert if notifications are not available or denied
            window.alert(message);
          }
        }
      });

      // Only update state if changes were made (notifications triggered)
      if (notificationCount > 0) {
        setTodos(updatedTodos);
      }

      // Sync to localStorage
      localStorage.setItem('todos', JSON.stringify(todos));
    }, NOTIFICATION_CHECK_INTERVAL);

    // Clean up interval on component unmount or when todos prop changes
    return () => clearInterval(interval);
  }, [todos, setTodos]); // Depend on todos and setTodos to re-run effect if they change

  // This component does not render anything visual
  return null;
}

export default NotificationManager;
