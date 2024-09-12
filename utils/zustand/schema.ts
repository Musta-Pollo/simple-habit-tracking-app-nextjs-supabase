// store.ts
import {
  Completion,
  ProfilePlusEmail,
  ProjectPlusHabitCountType,
} from "@/lib/new-types";
import { Tables } from "@/supabase";

export enum VisibilityFilter {
  All,
  Today,
  Tommorow,
  After_Tommorow,
}

type ScreenWidth = "sm" | "md" | "lg" | "xl";

export interface DataSlice {
  projects: ProjectPlusHabitCountType[];
  profile: ProfilePlusEmail | undefined;
  habits: Tables<"habits">[];
  completions: Completion[];
  setProjects: (projects: ProjectPlusHabitCountType[]) => void;
  setProfile: (profile: ProfilePlusEmail) => void;
  setHabits: (habits: Tables<"habits">[]) => void;
  setCompletions: (completions: Completion[]) => void;
}

export interface SearchSettingsSlice {
  projectSelectedId: string | undefined;
  habitSelectedId: string | undefined;

  visibilityFilter: VisibilityFilter;
  setSelectedProjectId: (id: string | undefined) => void;
  setSelectedHabitId: (id: string | undefined) => void;
  setVisibilityFilter: (filter: VisibilityFilter) => void;
  showToday: () => boolean;
  showTomorrow: () => boolean;
  showAfterTomorrow: () => boolean;
  //Navbar
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;

  isFilterSheetOpen: boolean;
  setIsFilterSheetOpen: (value: boolean) => void;
  //Resonsive
  screenWidth: ScreenWidth;
  setScreenWidth: (value: ScreenWidth) => void;
}
