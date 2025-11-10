import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(request: NextRequest) {
  try {
    const { workoutType, calories, injury, targetArea, time, equipment, days } =
      await request.json();

    const prompt = `


You are a professional fitness coach and nutrition expert. Create a personalized ${days}-day workout plan based on the following user data:

- Workout Type: {{workoutType}}
- Daily Calorie Goal: {{calories}} kcal
- Injuries or Limitations: ${injury || "none "} 
- Target Area: {{targetArea}}
- Available Workout Time per Day: {{time}} minutes
- Equipment Available: ${equipment ? "yes" : "no"}

**Instructions:**
1. Generate a 7-day workout plan (Day 1–Day 7) tailored to the information above.
2. Each day should include:
   - A short title describing the focus (e.g., “Full Body HIIT” or “Upper Body Strength”)
   - 4–6 exercises with brief instructions or sets/reps
   - An estimated number of calories burned for that session
3. Adjust intensity and exercise selection based on injuries and equipment availability.
4. Make it motivating and realistic for an individual following this plan.
5. At the end, include a “summary” with:
   - Total estimated calories burned in 7 days
   - A short motivational message

**Response Format:**
Structure the entire response as a valid JSON object.  
Each day should be a key (“Monday”, “Tuesday”, etc.), and the workout details should be subkeys.  
Example:

{
  "Monday": {
    "title": "Full Body HIIT (20 min)",
    "exercises": [
      "Jumping Jacks – 3 sets x 40 sec",
      "Push-ups – 3 sets x 15",
      "Bodyweight Squats – 3 sets x 20",
      "Plank – 3 sets x 30 sec"
    ],
    "caloriesBurned": 250
  },
  "Tuesday": {
    "title": "Upper Body Strength (20 min)",
    "exercises": [
      "Dumbbell Shoulder Press – 3 sets x 12",
      "Tricep Dips – 3 sets x 10",
      "Resistance Band Rows – 3 sets x 15"
    ],
    "caloriesBurned": 220
  },
  ... and so on for each day

  "summary": {
    "totalCaloriesBurned": 1650,
    "message": "Stay consistent — progress comes one rep at a time!"
  }
}

Return ONLY the JSON object, with no extra text or explanations or backticks.   
`;

    const response = await openAI.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiContent = response.choices[0].message.content!.trim();

    let parsedWorkoutPlan: { [day: string]: DailyWorkoutPlan };

    try {
      parsedWorkoutPlan = JSON.parse(aiContent);
    } catch (parseError) {
      console.error("Error parsing ai respone: ", parseError);
      return NextResponse.json(
        { error: "Failed to parse Workout plan. Please try again " },
        { status: 500 }
      );
    }

    // validate structure of plan
    if (typeof parsedWorkoutPlan !== "object" || parsedWorkoutPlan === null) {
      return NextResponse.json(
        { error: "Failed to parse Workout plan. Please try again " },
        { status: 500 }
      );
    }
    return NextResponse.json({ workoutPlan: parsedWorkoutPlan });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

interface DailyWorkoutPlan {
  title?: string;
  exercises?: string[];
  caloriesBurned: number;
}
