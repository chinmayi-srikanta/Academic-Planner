import { useState, useEffect } from "react";

const Timer = () => {
    const [subjects, setSubjects] = useState([]);
const [selectedSubject, setSelectedSubject] = useState("");
console.log(subjects);
  const [mode, setMode] = useState("study");
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isRunning, setIsRunning] = useState(false);
useEffect(() => {
  fetch("http://localhost:5000/subjects")
    .then((res) => res.json())
    .then((data) => setSubjects(data))
    .catch((err) => console.error(err));
}, []);
  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);

    if (newMode === "study") {
      setTimeLeft(studyTime * 60);
    } else {
      setTimeLeft(breakTime * 60);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
  setIsRunning(false);

  if (!selectedSubject || mode !== "study") return;

  const studiedSeconds = studyTime * 60 - timeLeft;

  if (studiedSeconds <= 0) return;

 const newSession = {
  subject: selectedSubject,
  duration: studiedSeconds,
  date: new Date().toISOString(),
};

fetch("http://localhost:5000/sessions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newSession),
}).catch((err) => console.error(err));
};
  const handleReset = () => {
    setIsRunning(false);
    switchMode(mode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-soft">
      
      <h1 className="text-3xl font-semibold mb-8 text-dark">
        Pomodoro Timer
      </h1>

      {/* Time Settings */}
      <div className="flex gap-8 mb-10">
        <div className="flex flex-col items-center">
          <label className="text-sm text-dark mb-1">Study</label>
          <input
            type="number"
            value={studyTime}
            onChange={(e) => setStudyTime(Number(e.target.value))}
            className="w-20 text-center bg-white border border-accent/30 rounded-lg p-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="text-sm text-dark mb-1">Break</label>
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
            className="w-20 text-center bg-white border border-accent/30 rounded-lg p-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Mode Switch */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => switchMode("study")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            mode === "study"
              ? "bg-primary text-white shadow-md"
              : "bg-white text-dark shadow"
          }`}
        >
          Study
        </button>

        <button
          onClick={() => switchMode("break")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition ${
            mode === "break"
              ? "bg-accent text-white shadow-md"
              : "bg-white text-dark shadow"
          }`}
        >
          Break
        </button>
      </div>
      <div className="mb-6">
  <select
    value={selectedSubject}
    onChange={(e) => setSelectedSubject(e.target.value)}
    className="bg-secondary/20 border border-accent/30 p-2 rounded-lg text-dark focus:outline-none"
  >
    <option value="">Select Subject</option>

    {subjects.map((sub) => (
      <option key={sub.id} value={sub.name}>
        {sub.name}
      </option>
    ))}
  </select>
</div>

      {/* Timer Card */}
      <div className="bg-soft border border-accent/20 p-12 rounded-3xl shadow-xl text-center w-80">
        <p className="text-5xl font-semibold text-dark mb-8 tracking-wide">
          {formatTime()}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            className="bg-primary hover:bg-dark text-white px-5 py-2 rounded-lg transition"
          >
            Start
          </button>

          <button
            onClick={handleStop}
            className="bg-secondary text-dark px-5 py-2 rounded-lg transition"
          >
            Stop
          </button>

          <button
            onClick={handleReset}
            className="bg-accent text-white px-5 py-2 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;