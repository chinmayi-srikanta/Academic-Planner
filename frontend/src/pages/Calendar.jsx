import { useState, useEffect } from "react";

const Calendar = () => {
  const today = new Date();
const [tasks, setTasks] = useState({});
useEffect(() => {
  fetch("http://localhost:5000/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data));
}, []);
const allTasks = Object.values(tasks).flat();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  return (
    <div className="bg-soft min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-mid">Calendar</h1>

        <div className="flex gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="bg-mid border border-accent/30 text-soft rounded-lg p-2"
          >
            {months.map((m, index) => (
              <option key={m} value={index}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-mid border border-accent/30 text-soft rounded-lg p-2 w-24"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-3">
        {days.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-dark"
          >
            {day}
          </div>
          
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3">
        {calendarCells.map((day, index) => {
            const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const dayTasks = allTasks.filter((t) => t.deadline === dateKey);
  const isToday =
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div
      key={index}
      className={`h-24 rounded-2xl border border-accent/20 p-3 shadow-sm ${
        day
          ? "bg-mid hover:scale-[1.02] hover:shadow-md transition cursor-pointer"
          : "bg-secondary/20"
      } ${isToday ? "ring-8 ring-dark " : ""}`}
    >
      {day && (
        <span className="text-soft font-medium">{day}</span>
      )}
      <div className="mt-1 text-xs text-soft/80 font-bold">
  {dayTasks.slice(0, 2).map((task) => (
    <div key={task.id} className="truncate">
      • {task.title}
    </div>
  ))}
</div>
    </div>
  );
})}
      </div>
    </div>
  );
};

export default Calendar;