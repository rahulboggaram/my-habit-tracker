import React, { useState, useEffect } from "react";

function HabitItem({ habit, isDark, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center justify-between p-4 border rounded-[24px] shadow-sm transition-all 
      ${
        isDark
          ? "border-slate-800 bg-slate-900/50"
          : `border-slate-100 ${habit.color}`
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`${
            isDark ? "bg-slate-800" : "bg-white/50"
          } h-10 w-10 rounded-xl flex items-center justify-center text-xl shadow-inner`}
        >
          ✨
        </div>
        <h3
          className={`font-bold transition-all ${
            habit.done
              ? "line-through text-slate-500"
              : isDark
              ? "text-slate-100"
              : "text-slate-800"
          }`}
        >
          {habit.text}
        </h3>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-500 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>

        <button
          onClick={onToggle}
          className={`h-8 w-8 rounded-xl border-2 flex items-center justify-center transition-all active:scale-90 ${
            habit.done
              ? isDark
                ? "bg-indigo-500 border-indigo-500"
                : "bg-slate-900 border-slate-900"
              : isDark
              ? "border-slate-700 bg-slate-800"
              : "bg-white/80 border-white"
          }`}
        >
          {habit.done && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habit-tracker-final");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("habit-tracker-final", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("dark-mode", darkMode);
  }, [darkMode]);

  // DATE & GREETING LOGIC
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const hour = today.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const total = habits.length;
  const completed = habits.filter((h) => h.done).length;
  const remaining = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const addHabit = () => {
    if (!input.trim()) return;
    const colors = [
      "bg-rose-100",
      "bg-sky-100",
      "bg-amber-100",
      "bg-indigo-100",
      "bg-emerald-100",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setHabits([
      ...habits,
      { id: Date.now(), text: input, done: false, color: randomColor },
    ]);
    setInput("");
  };

  return (
    <div
      className={`transition-colors duration-500 min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="p-8 max-w-sm mx-auto">
        {/* Updated Header with Date */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
              {dateString}
            </p>
            <h1 className="text-3xl font-black tracking-tighter">{greeting}</h1>
            <p
              className={
                darkMode
                  ? "text-slate-500 text-sm"
                  : "text-slate-400 text-sm font-medium"
              }
            >
              {total > 0 && remaining === 0
                ? "🎉 All goals met!"
                : `You have ${remaining} tasks to go`}
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl transition-all shadow-sm ${
              darkMode
                ? "bg-slate-800 text-yellow-400"
                : "bg-white text-slate-600"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-2 text-[10px] font-black uppercase tracking-widest opacity-50">
            <span>Daily Progress</span>
            <span>{progress}%</span>
          </div>
          <div
            className={`h-2 w-full rounded-full overflow-hidden ${
              darkMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          >
            <div
              className={`h-full transition-all duration-700 ${
                darkMode ? "bg-indigo-500" : "bg-slate-900"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-10">
          <input
            className={`flex-1 px-5 py-3 rounded-2xl outline-none border transition-all shadow-sm
              ${
                darkMode
                  ? "bg-slate-900 border-slate-800 focus:border-indigo-500 text-white"
                  : "bg-white border-transparent focus:border-slate-900 text-slate-900"
              }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
            placeholder="Add a new goal..."
          />
          <button
            onClick={addHabit}
            className={`${
              darkMode ? "bg-indigo-600" : "bg-slate-900"
            } text-white px-6 rounded-2xl font-bold active:scale-95 shadow-lg shadow-indigo-500/10`}
          >
            +
          </button>
        </div>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              isDark={darkMode}
              onToggle={() =>
                setHabits(
                  habits.map((h) =>
                    h.id === habit.id ? { ...h, done: !h.done } : h
                  )
                )
              }
              onDelete={() =>
                setHabits(habits.filter((h) => h.id !== habit.id))
              }
            />
          ))}

          {total === 0 && (
            <div className="text-center py-10 opacity-20 italic text-sm">
              Your list is empty.
            </div>
          )}

          {total > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Clear everything?")) setHabits([]);
              }}
              className="w-full mt-12 py-3 text-[10px] font-black uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-opacity"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
