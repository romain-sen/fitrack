import { atom, useAtomValue, useSetAtom } from "jotai";

export const weightAddedAtom = atom<number>(0);

export const useWeightAddedValue = () => useAtomValue(weightAddedAtom);

export const useSetWeightAdded = () => useSetAtom(weightAddedAtom);
