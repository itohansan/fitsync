"use client";

import { Spinner } from "@/components/spinner";
import { useMutation } from "@tanstack/react-query";

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
  // access patload and send through a POST request
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
    console.log(payload);
  }

  // if (data) {
  //   console.log(data);
  // }

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getWorkoutPlanForDay = (day: string): DailyWorkoutPlan | undefined => {
    if (!data?.workoutPlan) return undefined;
    return data?.workoutPlan[day];
  };

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          AI Plan Generator
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Workout Type */}
          <div className="flex flex-col">
            <label
              htmlFor="workoutType"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Workout Type
            </label>
            <input
              type="text"
              id="workoutType"
              name="workoutType"
              required
              placeholder="e.g. cardio, yoga, hiit..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Daily Calorie Goal */}
          <div className="flex flex-col">
            <label
              htmlFor="calories"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Daily Calorie Goal
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              required
              min={500}
              max={15000}
              placeholder="e.g. 2000"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Injury */}
          <div className="flex flex-col">
            <label
              htmlFor="injury"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Any Injury
            </label>
            <input
              type="text"
              id="injury"
              name="injury"
              required
              placeholder="e.g. wrist pain, hip fracture, none..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Target Area */}
          <div className="flex flex-col">
            <label
              htmlFor="targetArea"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Target Area
            </label>
            <input
              type="text"
              id="targetArea"
              name="targetArea"
              required
              placeholder="e.g. glute, arms, full body..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Workout Time */}
          <div className="flex flex-col">
            <label
              htmlFor="time"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Workout Time (minutes)
            </label>
            <input
              type="number"
              id="time"
              name="time"
              required
              placeholder="e.g. 10, 30..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Equipment */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="equipment"
              name="equipment"
              className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="equipment" className="text-sm text-gray-700">
              Equipment available
            </label>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isPending ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </form>
      </div>
      {/* Weekly Plan Section */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Weekly Plan
        </h2>

        {data?.workoutPlan && isSuccess ? (
          <div className="h-[600px] overflow-y-auto">
            <div className="space-y-6">
              {daysOfTheWeek.map((day, key) => {
                const workoutPlan = getWorkoutPlanForDay(day);
                return (
                  <div
                    key={key}
                    className="bg-black shadow-md rounded-lg p-4 border border-emerald-100"
                  >
                    <h3 className="text-xl font-semibold mb-2 ">{day}</h3>
                    {workoutPlan ? (
                      <div className="space-y-2">
                        <div>
                          <strong>Workout </strong>
                          {workoutPlan.title}
                        </div>
                        <div>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {workoutPlan.exercises?.map((exercise, idx) => (
                              <li key={idx}>{exercise}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : isPending ? (
          <Spinner />
        ) : (
          "Please generate a workout plan"
        )}
      </div>
    </div>
  );
}
