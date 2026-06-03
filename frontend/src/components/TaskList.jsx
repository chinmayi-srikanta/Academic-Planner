import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
  fetch("http://localhost:5000/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data));
}, []);

  const allTasks = Object.values(tasks).flat();

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = allTasks.filter((task) => task.deadline === today);

  const toggleTask = (taskId, subjectId) => {
    const updatedTasks = {
      ...tasks,
      [subjectId]: tasks[subjectId].map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      ),
    };

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="bg-secondary/20 border border-accent/20 rounded-2xl shadow-md p-5 mt-8">
      <h2 className="text-lg font-semibold text-dark mb-4">Today’s Tasks</h2>

      {todayTasks.length === 0 ? (
        <p className="text-dark/70">No tasks due today.</p>
      ) : (
        <ul className="space-y-3">
          {todayTasks.map((task) => (
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
                <p className="text-sm text-dark/70">{task.subject}</p>
              </div>

              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id, task.subjectId)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;