import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-dark text-soft p-5">
      <h1 className="text-xl font-bold mb-6">Planner</h1>

      <ul className="space-y-4">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/subjects">Subjects</Link>
        </li>
        <li>
          <Link to="/timer">Timer</Link>
        </li>
        <li>
  <Link to="/calendar">Calendar</Link>
</li>
      </ul>
    </div>
  );
};

export default Sidebar;