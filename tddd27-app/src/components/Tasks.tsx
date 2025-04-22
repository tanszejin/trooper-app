import React, { ReactEventHandler, useState } from "react";
import Card from "./Card";
import "./Tasks.css";


// TODO: add assignee for tasks

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
    setChecked([...checked, false])
    setNewTask('')
  }

  function addTaskOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newTask != "") {
        addTask()
    }
  }

  function deleteTask(idx: number) {
    let updatedTasks = [...tasks]
    updatedTasks.splice(idx, 1)
    setTasks(updatedTasks)
    let updatedChecked = [...checked]
    updatedChecked.splice(idx, 1)
    setChecked(updatedChecked)
  }

  function moveTaskUp(idx: number) {
    if (idx === 0) {return}
    let updatedTasks = [...tasks]
    updatedTasks.splice(idx-1, 2, tasks[idx], tasks[idx-1])
    setTasks(updatedTasks)
    let updatedChecked = [...checked]
    updatedChecked.splice(idx-1, 2, checked[idx], checked[idx-1])
    setChecked(updatedChecked)
  }

  function moveTaskDown(idx: number) {
    if (idx === tasks.length-1) {return}
    let updatedTasks = [...tasks]
    updatedTasks.splice(idx, 2, tasks[idx+1], tasks[idx])
    setTasks(updatedTasks)
    let updatedChecked = [...checked]
    updatedChecked.splice(idx, 2, checked[idx+1], checked[idx])
    setChecked(updatedChecked)
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
        width="48%"
        margin="0"
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
                  <span>✚</span>
                </button>
                <button
                  className="move-task-btn"
                  onClick={() => moveTaskUp(idx)}
                >
                  <span>⊲</span>
                </button>
                <button
                  className="move-task-btn"
                  onClick={() => moveTaskDown(idx)}
                >
                  <span>⊳</span>
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
