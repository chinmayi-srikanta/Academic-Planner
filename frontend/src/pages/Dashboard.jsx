import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/sessions")
    .then((res) => res.json())
    .then((data) => setSessions(data))
    .catch((err) => console.error(err));
}, []);

  const totalSeconds = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalMinutes = Math.floor(totalSeconds / 60);

  const mostStudiedSubject =
    sessions.length > 0
      ? sessions.reduce((acc, session) => {
          acc[session.subject] = (acc[session.subject] || 0) + session.duration;
          return acc;
        }, {})
      : {};

  const topSubject =
    Object.keys(mostStudiedSubject).length > 0
      ? Object.entries(mostStudiedSubject).sort((a, b) => b[1] - a[1])[0][0]
      : "None yet";

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-dark">Dashboard</h1>

      <div className="flex gap-6 flex-wrap">
        <StatsCard title="Total Study Time" value={`${totalMinutes} min`} />
        <StatsCard title="Study Sessions" value={sessions.length} />
        <StatsCard title="Most Studied" value={topSubject} />
      </div>

      <div className="bg-secondary/20 border border-accent/20 rounded-2xl shadow-md p-5 mt-8">
        <h2 className="text-lg font-semibold text-dark mb-3">
          Smart Insight
        </h2>
        <p className="text-dark">
          {sessions.length === 0
            ? "Start a study session to see your insights here."
            : `You have completed ${sessions.length} study session(s). Your most focused subject is ${topSubject}.`}
        </p>
      </div>

      <TaskList />
    </div>
  );
};

export default Dashboard;