import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const SubjectDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const subject = location.state;

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, [id]);

  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTask,
        deadline,
        subjectId: Number(id),
      }),
    });

    const createdTask = await res.json();

    setTasks((prev) => [...prev, createdTask]);

    setNewTask("");
    setDeadline("");
  };

  const toggleTask = async (taskId) => {
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  return (
    <div className="bg-soft min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6 text-dark">
        {subject?.name || "Subject"}
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="bg-secondary/20 border border-accent/30 p-2 rounded-lg w-64 text-dark focus:outline-none"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="bg-secondary/20 border border-accent/30 p-2 rounded-lg text-dark focus:outline-none"
        />

        <button
          onClick={addTask}
          className="bg-primary hover:bg-dark text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      <div className="bg-secondary/20 border border-accent/20 p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-dark">Tasks</h2>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border-b border-accent/20 pb-2"
            >
              <div>
                <p
                  className={`text-dark ${
                    task.done ? "line-through opacity-50" : ""
                  }`}
                >
                  {task.title}
                </p>

                {task.deadline && (
                  <p className="text-sm text-dark/70">
                    Due: {task.deadline}
                  </p>
                )}
              </div>

              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectDetail;