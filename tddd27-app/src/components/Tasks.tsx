import React, { ReactEventHandler, useEffect, useState } from "react";
import Card from "./Card";
import "./Tasks.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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
  // const [checked, setChecked] = useState<boolean[]>([]);
  const tasksCollectionRef = collection(db, "trips", tripId, "tasks");

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    console.log("getTasks function");
    try {
      const snapshot = await getDocs(tasksCollectionRef);
      console.log("tasks snapshot obtained");
      const data = snapshot.docs.map((doc) => ({
        assigned_to: doc.data().assigned_to,
        checked: doc.data().checked,
        content: doc.data().content,
        order: doc.data().order,
        id: doc.id,
      }));
      // order the tasks
      data.sort((a, b) => {
        return a.order - b.order;
      });

      setTasks(data);
    } catch (e) {
      console.error(e);
    }
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
      await getTasks();
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
      // update tasks array locally
      let updatedTasks = [...tasks];
      updatedTasks.splice(idx, 1);
      setTasks(updatedTasks);
    } catch (e) {
      console.error(e);
    }
  }

  async function swapOrder(a: number, b: number) {
    try {
      await updateDoc(doc(tasksCollectionRef, tasks[a].id), {
        order: tasks[b].order,
      });
      console.log("updated task above");
      await updateDoc(doc(tasksCollectionRef, tasks[b].id), {
        order: tasks[a].order,
      });
      console.log("updated task below");
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
    // query firestore to update tasks
    await getTasks();

    // let updatedTasks = [...tasks];
    // const temp = updatedTasks[idx].order;
    // updatedTasks[idx].order = updatedTasks[idx - 1].order;
    // updatedTasks[idx - 1].order = temp;
    // updatedTasks.splice(idx - 1, 2, tasks[idx], tasks[idx - 1]);
    // setTasks(updatedTasks);
  }

  async function moveTaskDown(idx: number) {
    if (idx === tasks.length - 1) {
      return;
    }
    console.log("moving task down");
    await swapOrder(idx, idx + 1);
    await getTasks();

    // let updatedTasks = [...tasks];
    // updatedTasks.splice(idx, 2, tasks[idx + 1], tasks[idx]);
    // setTasks(updatedTasks);
    // let updatedChecked = [...checked];
    // updatedChecked.splice(idx, 2, checked[idx + 1], checked[idx]);
    // setChecked(updatedChecked);
  }

  async function handleCheckbox(idx: number, isChecked: boolean) {
    try {
      await updateDoc(doc(tasksCollectionRef, tasks[idx].id), {
        checked: isChecked,
      });
      console.log("updated task, check: ", isChecked);
      let updatedTasks = [...tasks];
      updatedTasks[idx].checked = isChecked;
      setTasks(updatedTasks);
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
              <li key={idx}>
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
