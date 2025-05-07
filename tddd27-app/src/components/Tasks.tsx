import React, { ReactEventHandler, useEffect, useState } from "react";
import Card from "./Card";
import "./Tasks.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// TODO: add assignee for tasks

interface Props {
  tripId: string;
}

function Tasks({ tripId }: Props) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskContent, setNewTaskContent] = useState("");
  const tasksCollectionRef = collection(db, "trips", tripId, "tasks");

  useEffect(() => {
    if (!tripId) {
      console.error("no tripId provided");
      return;
    }
    getTasks();

    // listener for real-time updates
    const q = query(tasksCollectionRef, orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, setTasksFromSnapshot);
    return unsubscribe;
  }, []);

  async function getTasks() {
    console.log("getTasks function");
    try {
      const q = query(tasksCollectionRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      console.log("tasks snapshot obtained");
      setTasksFromSnapshot(snapshot);
    } catch (e) {
      console.error(e);
    }
  }

  function setTasksFromSnapshot(snapshot: QuerySnapshot) {
    if (snapshot.empty) return;
    console.log("setTasksFromSnapshot function");
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTasks(data);
  }

  async function addTask() {
    if (newTaskContent === "") {
      return;
    }
    console.log("addTask function");
    const newTask = {
      assigned_to: "",
      content: newTaskContent,
      order: tasks.length === 0 ? 0 : tasks[tasks.length - 1].order + 1, // order doesnt have to be consecutive no.s, just strictly incrreasing
      checked: false,
    };
    try {
      await addDoc(tasksCollectionRef, newTask);
      console.log("new task added: ", newTask);
    } catch (e) {
      console.error(e);
    }
    setNewTaskContent("");
  }

  function addTaskOnEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter" && newTaskContent != "") {
      addTask();
    }
  }

  async function deleteTask(idx: number) {
    console.log("deleting task: ", tasks[idx].content);
    try {
      await deleteDoc(doc(tasksCollectionRef, tasks[idx].id));
      console.log("task deleted");
    } catch (e) {
      console.error(e);
    }
  }

  async function swapOrder(a: number, b: number) {
    try {
      await Promise.all([
        updateDoc(doc(tasksCollectionRef, tasks[a].id), {
          order: tasks[b].order,
        }),
        updateDoc(doc(tasksCollectionRef, tasks[b].id), {
          order: tasks[a].order,
        }),
      ]);
      console.log("updated task orders");
    } catch (e) {
      console.error(e);
    }
  }

  async function moveTaskUp(idx: number) {
    if (idx === 0) {
      return;
    }
    console.log("moving task up");
    await swapOrder(idx - 1, idx);
  }

  async function moveTaskDown(idx: number) {
    if (idx === tasks.length - 1) {
      return;
    }
    console.log("moving task down");
    await swapOrder(idx, idx + 1);
  }

  async function handleCheckbox(idx: number, isChecked: boolean) {
    try {
      await updateDoc(doc(tasksCollectionRef, tasks[idx].id), {
        checked: isChecked,
      });
      console.log("updated task, check: ", isChecked);
    } catch (e) {
      console.error(e);
    }
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
              <li key={task.id}>
                <div className="custom-checkbox-container">
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.checked}
                    onChange={(e) => handleCheckbox(idx, e.target.checked)}
                  />
                  <span
                    className={`checkmark ${task.checked ? "checked" : ""}`}
                  ></span>
                </div>
                <span className={`task-text ${task.checked ? "checked" : ""}`}>
                  {task.content}
                </span>
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
            <input className="task-checkbox" type="checkbox" disabled />
            <span className="checkmark"></span>
          </div>
          <textarea
            className="new-task-textarea"
            placeholder="new task"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
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
