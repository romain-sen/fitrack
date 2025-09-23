import { ExerciseGoal } from "../../types/ExerciseGoal";
import {
  calculateExerciseTimeInSeconds,
  calculateTotalGoalTime,
  ExerciseGoalCalculation,
} from "../calculateTotalTime";

describe("calculateTotalGoalTime", () => {
  it("should calculate total time for km/h exercises", () => {
    const exercises: ExerciseGoalCalculation[] = [
      {
        label: "Running",
        unit: "km/h" as const,
        goalValueInUnit: 10, // 10 km/h
        minValueInUnit: 5,
        goalValueInSeconds: 360, // 6 minutes
        adjustingStep: 0.5,
        taskAmount: 5, // 5 km
        transitionTimeSec: 30,
      },
      {
        label: "Cycling",
        unit: "km/h" as const,
        goalValueInUnit: 20, // 20 km/h
        minValueInUnit: 10,
        goalValueInSeconds: 180, // 3 minutes
        adjustingStep: 1,
        taskAmount: 10, // 10 km
        transitionTimeSec: 45,
      },
    ];

    const totalTime = calculateTotalGoalTime(exercises);

    // Exercise 1: 5 km / 10 km/h = 0.5 hours = 30 minutes + 30 seconds transition = 30.5 minutes
    // Exercise 2: 10 km / 20 km/h = 0.5 hours = 30 minutes + 45 seconds transition = 30.75 minutes
    // Total: 30.5 + 30.75 = 61.25 minutes
    expect(totalTime).toBeCloseTo(61.25, 2);
  });

  it("should calculate total time for rep/min exercises", () => {
    const exercises = [
      {
        label: "Push-ups",
        unit: "rep/min" as const,
        goalValueInUnit: 20, // 20 reps per minute
        minValueInUnit: 10,
        goalValueInSeconds: 60,
        adjustingStep: 1,
        taskAmount: 40, // 40 reps
        transitionTimeSec: 60,
      },
      {
        label: "Squats",
        unit: "rep/min" as const,
        goalValueInUnit: 15, // 15 reps per minute
        minValueInUnit: 8,
        goalValueInSeconds: 120,
        adjustingStep: 1,
        taskAmount: 30, // 30 reps
        transitionTimeSec: 30,
      },
    ];

    const totalTime = calculateTotalGoalTime(exercises);

    // Exercise 1: 40 reps / 20 rep/min = 2 minutes + 60 seconds transition = 3 minutes
    // Exercise 2: 30 reps / 15 rep/min = 2 minutes + 30 seconds transition = 2.5 minutes
    // Total: 3 + 2.5 = 5.5 minutes
    expect(totalTime).toBeCloseTo(5.5, 2);
  });

  it("should calculate total time for mixed unit exercises", () => {
    const exercises = [
      {
        label: "Running",
        unit: "km/h" as const,
        goalValueInUnit: 12, // 12 km/h
        minValueInUnit: 6,
        goalValueInSeconds: 300,
        adjustingStep: 0.5,
        taskAmount: 6, // 6 km
        transitionTimeSec: 45,
      },
      {
        label: "Burpees",
        unit: "rep/min" as const,
        goalValueInUnit: 10, // 10 reps per minute
        minValueInUnit: 5,
        goalValueInSeconds: 180,
        adjustingStep: 1,
        taskAmount: 20, // 20 reps
        transitionTimeSec: 30,
      },
    ];

    const totalTime = calculateTotalGoalTime(exercises);

    // Exercise 1: 6 km / 12 km/h = 0.5 hours = 30 minutes + 45 seconds transition = 30.75 minutes
    // Exercise 2: 20 reps / 10 rep/min = 2 minutes + 30 seconds transition = 2.5 minutes
    // Total: 30.75 + 2.5 = 33.25 minutes
    expect(totalTime).toBeCloseTo(33.25, 2);
  });

  it("should handle exercises with zero transition time", () => {
    const exercises = [
      {
        label: "Running",
        unit: "km/h" as const,
        goalValueInUnit: 10,
        minValueInUnit: 5,
        goalValueInSeconds: 360,
        adjustingStep: 0.5,
        taskAmount: 5,
        transitionTimeSec: 0,
      },
    ];

    const totalTime = calculateTotalGoalTime(exercises);

    // 5 km / 10 km/h = 0.5 hours = 30 minutes + 0 seconds transition = 30 minutes
    expect(totalTime).toBeCloseTo(30, 2);
  });

  it("should handle single exercise", () => {
    const exercises = [
      {
        label: "Push-ups",
        unit: "rep/min" as const,
        goalValueInUnit: 15,
        minValueInUnit: 8,
        goalValueInSeconds: 120,
        adjustingStep: 1,
        taskAmount: 30,
        transitionTimeSec: 45,
      },
    ];

    const totalTime = calculateTotalGoalTime(exercises);

    // 30 reps / 15 rep/min = 2 minutes + 45 seconds transition = 2.75 minutes
    expect(totalTime).toBeCloseTo(2.75, 2);
  });

  it("should handle empty array", () => {
    const exercises: any[] = [];
    const totalTime = calculateTotalGoalTime(exercises);
    expect(totalTime).toBe(0);
  });
});

describe("calculateExerciseTimeInSeconds", () => {
  it("should calculate time for km/h exercise", () => {
    const exercise: ExerciseGoal = {
      label: "Running",
      unit: "km/h",
      goalValueInUnit: 10, // 10 km/h
      minValueInUnit: 5,
      goalValueInSeconds: 360,
      adjustingStep: 0.5,
      taskAmount: 5, // 5 km
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);

    // 5 km / 10 km/h = 0.5 hours = 1800 seconds
    expect(timeInSeconds).toBe(1800);
  });

  it("should calculate time for rep/min exercise", () => {
    const exercise: ExerciseGoal = {
      label: "Push-ups",
      unit: "rep/min",
      goalValueInUnit: 20, // 20 reps per minute
      minValueInUnit: 10,
      goalValueInSeconds: 60,
      adjustingStep: 1,
      taskAmount: 40, // 40 reps
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);

    // 40 reps / 20 rep/min = 2 minutes = 120 seconds
    expect(timeInSeconds).toBe(120);
  });

  it("should handle decimal values for km/h", () => {
    const exercise: ExerciseGoal = {
      label: "Running",
      unit: "km/h",
      goalValueInUnit: 8.5, // 8.5 km/h
      minValueInUnit: 4,
      goalValueInSeconds: 423.5,
      adjustingStep: 0.5,
      taskAmount: 3.4, // 3.4 km
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);

    // 3.4 km / 8.5 km/h = 0.4 hours = 1440 seconds
    expect(timeInSeconds).toBeCloseTo(1440, 0);
  });

  it("should handle decimal values for rep/min", () => {
    const exercise: ExerciseGoal = {
      label: "Burpees",
      unit: "rep/min",
      goalValueInUnit: 12.5, // 12.5 reps per minute
      minValueInUnit: 6,
      goalValueInSeconds: 96,
      adjustingStep: 0.5,
      taskAmount: 25, // 25 reps
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);

    // 25 reps / 12.5 rep/min = 2 minutes = 120 seconds
    expect(timeInSeconds).toBe(120);
  });

  it("should throw error for invalid unit", () => {
    const exercise = {
      label: "Invalid Exercise",
      unit: "invalid_unit" as any,
      goalValueInUnit: 10,
      minValueInUnit: 5,
      goalValueInSeconds: 360,
      adjustingStep: 0.5,
      taskAmount: 5,
    };

    expect(() => calculateExerciseTimeInSeconds(exercise)).toThrow(
      "Invalid unit"
    );
  });

  it("should handle zero goal value (should result in Infinity)", () => {
    const exercise: ExerciseGoal = {
      label: "Running",
      unit: "km/h",
      goalValueInUnit: 0, // 0 km/h
      minValueInUnit: 0,
      goalValueInSeconds: 0,
      adjustingStep: 0.5,
      taskAmount: 5,
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);
    expect(timeInSeconds).toBe(Infinity);
  });

  it("should handle zero task amount", () => {
    const exercise: ExerciseGoal = {
      label: "Running",
      unit: "km/h",
      goalValueInUnit: 10,
      minValueInUnit: 5,
      goalValueInSeconds: 360,
      adjustingStep: 0.5,
      taskAmount: 0, // 0 km
    };

    const timeInSeconds = calculateExerciseTimeInSeconds(exercise);
    expect(timeInSeconds).toBe(0);
  });
});
