import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { DEFAULT_TRANSITION_TIME_IN_SEC } from "../constants/defaultTransitionTime";
import { INITIAL_EXERCISE_TIME_GOAL } from "../constants/initialExerciseTimeGoal";
import { Exercise } from "../types/Exercise";

export const goalsAtom = atom<Exercise[]>(INITIAL_EXERCISE_TIME_GOAL);

export const transitionTimeAtom = atom<number>(DEFAULT_TRANSITION_TIME_IN_SEC);

export const useGoalsValue = () => useAtomValue(goalsAtom);

export const useSetGoals = () => useSetAtom(goalsAtom);

export const useGoals = () => useAtom(goalsAtom);

export const useTransitionTimeValue = () => useAtomValue(transitionTimeAtom);

export const useSetTransitionTime = () => useSetAtom(transitionTimeAtom);

export const useTransitionTime = () => useAtom(transitionTimeAtom);
