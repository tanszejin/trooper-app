import React, { ReactEventHandler, useState } from "react";
import Card from "./Card";
import "./Tasks.css";


// TODO: change layout of cards to give more space, add assignee for tasks

function Tasks() {
  const [tasks, setTasks] = useState([
    "dummy task",
    "dummy task with a very long text blabla very longggg",
    "dt",
  ]);
  const [newTask, setNewTask] = useState("");
  const [checked, setChecked] = useState(tasks.map(_ => false));

  function addTask() {
    if (newTask === "") {return}
    setTasks([...tasks, newTask])
    setNewTask('')
  }

  function addTaskOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newTask != "") {
        setTasks([...tasks, newTask])
        setNewTask('')
    }
  }

  function deleteTask(idx: number) {
    let updated = [...tasks]
    updated.splice(idx, 1)
    setTasks(updated)
  }

  function moveTaskUp(idx: number) {
    if (idx === 0) {return}
    let updated = [...tasks]
    updated.splice(idx-1, 2, tasks[idx], tasks[idx-1])
    setTasks(updated)
  }

  function moveTaskDown(idx: number) {
    if (idx === tasks.length-1) {return}
    let updated = [...tasks]
    updated.splice(idx, 2, tasks[idx+1], tasks[idx])
    setTasks(updated)
  }

  function handleCheckbox(idx: number, isChecked: boolean) {
    let updated = [...checked]
    updated[idx] = isChecked
    setChecked(updated)
    console.log(`checked task ${idx}, new checked: ${updated}`)
  }

  return (
    <>
      <Card
        className="trip-smaller-card"
        width="24%"
        margin="0 8px"
        padding="1.5rem 0.3rem"
      >
        <h5 className="trip-card-name">Tasks</h5>
        <div className="task-list-container">
          <ol>
            {tasks.map((task, idx) => (
              <li key={idx}>
                <div className="custom-checkbox-container">
                  <input className="task-checkbox" type="checkbox" checked={checked[idx]} onChange={(e) => handleCheckbox(idx, e.target.checked)}/>
                  <span className={`checkmark ${checked[idx] ? 'checked' : ''}`}></span>
                </div>
                <span className={`task-text ${checked[idx] ? 'checked' : ''}`}>{task}</span>
                <button
                  className="delete-task-btn"
                  onClick={() => deleteTask(idx)}
                >
                  ☒
                </button>
                <button
                  className="move-task-btn"
                  onClick={() => moveTaskUp(idx)}
                >
                  ↑
                </button>
                <button
                  className="move-task-btn"
                  onClick={() => moveTaskDown(idx)}
                >
                  ↓
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="new-task-container">
          <div className="custom-checkbox-container">
            <input className="task-checkbox" type="checkbox" disabled/>
            <span className="checkmark"></span>
          </div>
          <textarea
            className="new-task-textarea"
            placeholder="new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onBlur={addTask}
            onKeyUp={addTaskOnEnter}
            maxLength={40}
            wrap="soft"
            rows={1}
          />
        </div>
      </Card>
    </>
  );
}

export default Tasks;
