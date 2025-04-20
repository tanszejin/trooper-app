import React, { useState } from "react";
import Card from "./Card";
import "./Tasks.css";
import Button from "./Button";

function Tasks() {
  const [tasks, setTasks] = useState([
    "dummy task",
    "dummy task with a very long text blabla very longggg",
    "dt",
  ]);
  const [newTask, setNewTask] = useState("");

  function addTask() {}

  function deleteTask(idx: number) {}

  function moveTaskUp(idx: number) {}

  function moveTaskDown(idx: number) {}

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
                <input className="task-checkbox" type="checkbox"/>
                <span className="task-text">{task}</span>
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
                  onClick={() => moveTaskUp(idx)}
                >
                  ↓
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="new-task-container">
          <input className="task-checkbox" type="checkbox"/> 
          <input
            className="new-task-input"
            type="text"
            placeholder="new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
      </Card>
    </>
  );
}

export default Tasks;
