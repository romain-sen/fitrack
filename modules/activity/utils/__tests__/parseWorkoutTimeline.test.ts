import { Exercise } from "@/modules/activity/types/Exercise";
import { parseWorkoutTimeline } from "../parseWorkoutTimeline";

describe("parseWorkoutTimeline", () => {
  const stepsData: Exercise[] = [
    {
      name: "Running 1",
      unit: "km",
      taskAmount: 1.6,
      repetitionIncrement: [],
      startTimestamp: 0,
      endTimestamp: 200000,
      details: [],
    },
    // Transition of 23000 ms
    {
      name: "Pull Ups",
      unit: "rep",
      taskAmount: 100,
      repetitionIncrement: [],
      startTimestamp: 223000, // = endTimestamp of Running 1 + transition of 23000 ms
      endTimestamp: 658000, // 400s of goal + 35 seconds of late
      details: [],
    },
    // Transition of 26000 ms
    {
      name: "Push Ups",
      unit: "rep",
      taskAmount: 200,
      repetitionIncrement: [],
      startTimestamp: 684000, // = endTimestamp of Pull Ups + transition of 26000 ms
      endTimestamp: 1093000, // Goal 400 value + 9 seconds of late
      details: [],
    },
    // Transition of 4 sec or 4000ms
    {
      name: "Squats",
      unit: "rep",
      taskAmount: 300,
      repetitionIncrement: [],
      startTimestamp: 1097000, // = endTimestamp of Push Ups + transition of 4000 ms
      endTimestamp: 1497000, // Goal 400 value + 0 seconds of late
      details: [],
    },
    // Transition of 6000 ms
    {
      name: "Running 2",
      unit: "km",
      taskAmount: 1.6,
      repetitionIncrement: [],
      startTimestamp: 1503000, // = endTimestamp of Squats + transition of 6000 ms
      endTimestamp: 2316000, // Goal 700 value + 113 seconds of late
      details: [],
    },
  ];

  const expectedBase = [
    {
      name: "Running 1",
      duration: 200000,
      transition: 23000,
    },
    {
      name: "Pull Ups",
      duration: 435000,
      transition: 26000,
    },
    {
      name: "Push Ups",
      duration: 409000,
      transition: 4000,
    },
    {
      name: "Squats",
      duration: 400000,
      transition: 6000,
    },
    {
      name: "Running 2",
      duration: 813000,
      transition: undefined,
    },
  ];

  it.each([0, 1, 2, 3, 4])(
    "should calculate the correct transition and duration when currentStepIndex = %i",
    (currentIndex) => {
      const result = parseWorkoutTimeline(stepsData, currentIndex);

      expect(result).toEqual(
        expectedBase.map((step, index) => ({
          ...step,
          isCurrentExercise: index === currentIndex,
          isCurrentTransition: false,
        }))
      );
    }
  );
});

describe("parseWorkoutTimeline with transition", () => {
  const buildStepsWithTransitionAt = (transitionIndex: number): Exercise[] => {
    return Array.from({ length: 5 }, (_, i) => {
      const baseTimestamp = i * 100000;
      return {
        name: `Exercise ${i + 1}`,
        unit: "rep",
        taskAmount: 100,
        repetitionIncrement: [],

        startTimestamp:
          i === 0 ? 0 : i <= transitionIndex ? baseTimestamp : null,
        endTimestamp:
          i < transitionIndex
            ? baseTimestamp + 50000
            : i === transitionIndex
              ? baseTimestamp + 60000
              : null,
        details: [],
      };
    });
  };

  it.each([0, 1, 2, 3])(
    "should detect transition at index %i",
    (transitionIndex) => {
      const steps = buildStepsWithTransitionAt(transitionIndex);
      const result = parseWorkoutTimeline(steps, transitionIndex);

      result.forEach((parsed, index) => {
        expect(parsed.isCurrentTransition).toBe(index === transitionIndex);
      });
    }
  );
});
