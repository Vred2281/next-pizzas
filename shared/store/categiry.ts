import { create } from "zustand";

interface State {
	activateId: number;
	setActivateId: (activateId: number) => void;
}

export const useCategoryStore = create<State>((set) => ({
	activateId: 1,
	setActivateId: (activateId: number) => set({ activateId }),
}));