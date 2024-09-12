import { DataSlice } from "./schema";
import { StateSlice } from "./store";

// DataSlice default data
export const defaultDataSlice: DataSlice = {
  projects: [],
  profile: undefined,
  habits: [],
  completions: [],
  setCompletions: () => {},
  setProjects: () => {},
  setProfile: () => {},
  setHabits: () => {},
};

export const createDataSlice: StateSlice<DataSlice> = (set, get) => ({
  ...defaultDataSlice,
  setProjects: (projects) => {
    set((state) => {
      if (JSON.stringify(state.data.projects) !== JSON.stringify(projects)) {
        state.data.projects = projects;
      }
    });
  },
  setProfile: (profile) => {
    set((state) => {
      if (JSON.stringify(state.data.profile) !== JSON.stringify(profile)) {
        state.data.profile = profile;
      }
    });
  },
  setHabits: (habits) => {
    set((state) => {
      if (JSON.stringify(state.data.habits) !== JSON.stringify(habits)) {
        state.data.habits = habits;
      }
    });
  },
  setCompletions: (completions) => {
    set((state) => {
      if (
        JSON.stringify(state.data.completions) !== JSON.stringify(completions)
      ) {
        state.data.completions = completions;
      }
    });
  },
});
