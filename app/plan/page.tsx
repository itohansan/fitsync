"use client";

import { Spinner } from "@/components/spinner";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface WorkoutPlanInput {
  workoutType: string;
  calories: number;
  injury: string;
  targetArea: string;
  time: number;
  equipment: string;
  days?: number;
}

interface DailyWorkoutPlan {
  title?: string;
  exercises?: string[];
  caloriesBurned?: number;
}

interface WeeklyWorkoutPlan {
  [day: string]: DailyWorkoutPlan;
}

interface WorkoutPlanResponse {
  workoutPlan?: WeeklyWorkoutPlan;
  error?: string;
}

async function generateWorkoutPlan(payload: WorkoutPlanInput) {
  const response = await fetch("/api/generate-workoutplan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export default function PlanDashboard() {
  const { mutate, isPending, data, isSuccess } = useMutation<
    WorkoutPlanResponse,
    Error,
    WorkoutPlanInput
  >({
    mutationFn: generateWorkoutPlan,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload: WorkoutPlanInput = {
      workoutType: formData.get("workoutType")?.toString() || "",
      calories: Number(formData.get("calories")) || 2000,
      injury: formData.get("injury")?.toString() || "",
      targetArea: formData.get("targetArea")?.toString() || "",
      time: Number(formData.get("time")) || 20,
      equipment: formData.get("equipment") ? "yes" : "no",
      days: 7,
    };
    mutate(payload);
  }

  const daysOfTheWeek = [
    { name: "Monday", icon: "💪", color: "from-blue-500 to-blue-600" },
    { name: "Tuesday", icon: "🔥", color: "from-purple-500 to-purple-600" },
    { name: "Wednesday", icon: "⚡", color: "from-pink-500 to-pink-600" },
    { name: "Thursday", icon: "🎯", color: "from-blue-500 to-purple-500" },
    { name: "Friday", icon: "🏃", color: "from-purple-500 to-pink-500" },
    { name: "Saturday", icon: "🚀", color: "from-blue-500 to-pink-500" },
    { name: "Sunday", icon: "🌟", color: "from-gray-500 to-gray-600" },
  ];

  const getWorkoutPlanForDay = (day: string): DailyWorkoutPlan | undefined => {
    return data?.workoutPlan?.[day];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-50 to-white">
              AI PLAN GENERATOR
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <div className="h-1 w-6 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-10 shadow-2xl hover:border-gray-600/50 transition-all"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Your Details</h2>
              </div>
              <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {[
                {
                  label: "Workout Type",
                  name: "workoutType",
                  ph: "HIIT • Yoga • Strength",
                  icon: "🏋️",
                },
                {
                  label: "Daily Calorie Goal",
                  name: "calories",
                  type: "number",
                  ph: "2200",
                  icon: "🔥",
                },
                {
                  label: "Injuries",
                  name: "injury",
                  ph: "none • knee • shoulder",
                  icon: "🩹",
                },
                {
                  label: "Target Area",
                  name: "targetArea",
                  ph: "full body • glutes • arms",
                  icon: "🎯",
                },
                {
                  label: "Time (min)",
                  name: "time",
                  type: "number",
                  ph: "30",
                  icon: "⏱️",
                },
              ].map((f) => (
                <div key={f.name}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
                    <span>{f.icon}</span>
                    {f.label}
                  </label>
                  <input
                    type={f.type || "text"}
                    name={f.name}
                    required
                    placeholder={f.ph}
                    className="w-full px-5 py-4 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 text-white text-base"
                  />
                </div>
              ))}

              <div className="bg-gray-900/30 rounded-xl p-4 border-2 border-gray-700">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="equipment"
                    name="equipment"
                    className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor="equipment"
                    className="text-gray-200 font-medium flex items-center gap-2"
                  >
                    <span>🏋️‍♂️</span>
                    Equipment available
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className="w-full py-5 mt-8 font-bold text-xl tracking-wider bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-3">
                    <Spinner /> GENERATING PLAN
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    ✨ GENERATE PLAN
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT: Weekly Plan */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border-2 border-gray-700/50 rounded-3xl p-10 shadow-2xl flex flex-col hover:border-gray-600/50 transition-all"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg--to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">7-Day Plan</h2>
              </div>
              <div className="h-1 w-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isPending ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Spinner />
                  <p className="text-gray-400 text-lg animate-pulse">
                    Crafting your perfect plan...
                  </p>
                </div>
              ) : data?.workoutPlan && isSuccess ? (
                <div className="space-y-4">
                  {daysOfTheWeek.map((day, i) => {
                    const plan = getWorkoutPlanForDay(day.name);
                    return (
                      <motion.div
                        key={day.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{day.icon}</span>
                          <h3 className="text-xl font-bold text-white">
                            {day.name}
                          </h3>
                        </div>

                        {plan ? (
                          <div className="space-y-4">
                            <div
                              className={`bg-gradient-to-r ${day.color} bg-opacity-10 border-l-4 border-l-${day.color} rounded-lg p-4`}
                            >
                              <p className="text-lg font-bold text-white">
                                {plan.title}
                              </p>
                            </div>

                            <ul className="space-y-2">
                              {plan.exercises?.map((ex, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-gray-300 text-sm"
                                >
                                  <span className="text-blue-400 font-bold mt-0.5">
                                    •
                                  </span>
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>

                            {plan.caloriesBurned && (
                              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mt-4">
                                <p className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                                  🔥 {plan.caloriesBurned} calories
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic text-sm">
                            Rest & Recovery Day
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-8">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed mb-2">
                    Your perfect week starts here
                  </p>
                  <p className="text-white font-bold text-xl">
                    Fill the form to begin →
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #a855f7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #9333ea);
        }
      `}</style>
    </div>
  );
}
