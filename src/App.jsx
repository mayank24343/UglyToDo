import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [Id, setId] = useState(0);
  const [mode, setMode] = useState("ADD");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task !== "") {
      if (mode === "ADD") {
        setTasks([...tasks, { task, Id, done: false }]);
        setId(Id + 1);
      } else if (mode === "EDIT") {
        setTasks(tasks.map(item =>
          item.Id === editId ? { task, Id: editId, done: false } : item
        ));
        setMode("ADD");
        setEditId(null);
      }
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(item => item.Id !== id));
  };

  const handleEdit = (id) => {
    const found = tasks.find(item => item.Id === id);
    setTask(found.task);
    setMode("EDIT");
    setEditId(id);
  };

  const handleDone = (id) => {
    setTasks(tasks.map(item => item.Id === id ? { ...item, done: !item.done } : item))
  }

  return (
    <div className='w-3xl border-2 border-white rounded-2xl p-10 shadow-gray-600 shadow-lg justify-center'>
      <div className='flex'>
        <input
          name='myinput'
          onChange={handleChange}
          value={task}
          className='border-2 border-white text-white w-2xl h-auto'
          type='text'
        />
        <button className='m-3 border-2 border-white rounded-md p-3 py-1 w-' onClick={addTask}>
          {mode === "ADD" ? "Add" : "Save"}
        </button>
      </div>
      <div>
        {tasks.map(item => {
          return (
            <div className="flex justify-between items-center w-2xl" key={item.Id}>
              <div><button className='m-3 border-2 border-white rounded-md p-3 py-1' onClick={() => handleDone(item.Id)}>Done</button></div>
              <div className={item.done ? "line-through" : ""}>{item.task}</div>
              <div className='buttons flex'>
                <button className='m-3 border-2 border-white rounded-md p-3 py-1' onClick={() => handleDelete(item.Id)}>Delete</button>
                <button className='m-3 border-2 border-white rounded-md p-3 py-1' onClick={() => handleEdit(item.Id)}>Edit</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
