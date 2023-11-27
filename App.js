import React, { useState } from 'react';
import './App.css';

const Task = ({ task, toggleTask, deleteTask }) => {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="filter-bar">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={filter === 'incomplete' ? 'active' : ''}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const handleEnterPress = (e)=>{
    if (e.keyCode===13){
        addTask(newTask)
        setNewTask("")
    }
}
  return (
    <div className="app">
      <h1>TODO</h1>
      <div className="add-task">
      <div className='center-container'>
        <input
          type="text" className='input-box-todo'
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}onKeyDown={handleEnterPress}
        />
        <button className='add-btn' onClick={addTask}>Add Task</button>
      </div>
      </div>
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>

  );
};



export default App;