import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Timer from "./pages/Timer";
import SubjectDetail from "./pages/SubjectDetail";
import { Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
function App() {
  return (
    <div className="flex bg-soft min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/subjects/:id" element={<SubjectDetail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
