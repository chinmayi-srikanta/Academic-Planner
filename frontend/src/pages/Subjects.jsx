import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Subjects = () => {
  
const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  useEffect(() => {
  fetch("http://localhost:5000/subjects")
    .then((res) => res.json())
    .then((data) => setSubjects(data));
}, []);
const navigate = useNavigate();
const addSubject = async () => {
  if (!newSubject.trim()) return;

  await fetch("http://localhost:5000/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newSubject }),
  });

  fetchSubjects();
  setNewSubject("");
};
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Subjects</h1>

      {/* Add Subject */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add new subject..."
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addSubject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
  key={sub.id}
  onClick={() =>
  navigate(`/subjects/${sub.id}`, { state: sub })
}
  className="bg-secondary/20 border border-accent/30 p-5 rounded-2xl shadow-md hover:bg-secondary/30 hover:scale-[1.02] transition cursor-pointer"
>
            <h2 className="text-lg font-semibold">{sub.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;