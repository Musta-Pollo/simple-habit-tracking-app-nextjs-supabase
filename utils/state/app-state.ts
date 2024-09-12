//import { ProfilePlusEmail, ProjectPlusHabitCountType } from "@/lib/new-types";
//import { Tables } from "@/supabase";
//import { observable } from "@legendapp/state";
//import { createClient } from "../supabase/client";

//export enum VisibilityFilter {
//  All,
//  Today,
//  Tommorow,
//  After_Tommorow,
//}

//interface GlobalState {
//  projectSelectedId: string | undefined;
//  visibilityFilter: VisibilityFilter;
//  habitSelectedId: string | undefined;
//  setSelectedProjectId: (id: string) => void;
//  setSelectedHabitId: (id: string) => void;
//  setVisibilityFilter: (filter: VisibilityFilter) => void;
//  //user: User | undefined;
//  //setUser: (user: User) => void;
//  showToday: () => boolean;
//  showTommorow: () => boolean;
//  showAfterTommorow: () => boolean;
//  projects: ProjectPlusHabitCountType[];
//  profile: ProfilePlusEmail | undefined;
//  habits: Tables<"habits">[];
//  setProjects: (projects: ProjectPlusHabitCountType[]) => void;
//  setProfile: (profile: ProfilePlusEmail) => void;
//  setHabits: (habits: Tables<"habits">[]) => void;
//}

//// Create a global observable for the Todos
//let nextId = 0;
//export const store$ = observable<GlobalState>({
//  projectSelectedId: undefined,
//  visibilityFilter: VisibilityFilter.All,
//  habitSelectedId: undefined,
//  setSelectedProjectId: (id: string) => {
//    store$.projectSelectedId.set(id);
//    console.log("Selected Project Id", id);
//  },
//  setSelectedHabitId: (id: string) => {
//    store$.habitSelectedId.set(id);
//  },
//  setVisibilityFilter: (filter: VisibilityFilter) => {
//    store$.visibilityFilter.set(filter);
//    store$.projectSelectedId.set(undefined);
//    store$.habitSelectedId.set(undefined);
//  },
//  showToday: (): boolean => {
//    let res =
//      store$.habitSelectedId.get() == undefined &&
//      store$.projectSelectedId.get() == undefined &&
//      (store$.visibilityFilter.get() === VisibilityFilter.Today ||
//        store$.visibilityFilter.get() === VisibilityFilter.All);

//    return res;
//  },
//  //getProjects: () => {
//  //  let supabase = createClient();
//  //  return supabase.from("projects").select("*");
//  //}
//  showTommorow: (): boolean => {
//    return (
//      store$.habitSelectedId.get() == undefined &&
//      store$.projectSelectedId.get() == undefined &&
//      (store$.visibilityFilter.get() === VisibilityFilter.Tommorow ||
//        store$.visibilityFilter.get() === VisibilityFilter.All)
//    );
//  },
//  showAfterTommorow: (): boolean => {
//    return (
//      store$.habitSelectedId.get() == undefined &&
//      store$.projectSelectedId.get() == undefined &&
//      (store$.visibilityFilter.get() === VisibilityFilter.After_Tommorow ||
//        store$.visibilityFilter.get() === VisibilityFilter.All)
//    );
//  },
//  projects: [],
//  profile: undefined,
//  habits: [],
//  setProjects: (projects: ProjectPlusHabitCountType[]) => {
//    //Check for deep equality, maybe use stringify
//    const currentState = store$.projects.get();
//    if (JSON.stringify(currentState) !== JSON.stringify(projects)) {
//      store$.projects.set(projects);
//    }
//  },
//  setProfile: (profile: ProfilePlusEmail) => {
//    //Check for deep equality, maybe use stringify
//    const currentState = store$.profile.get();
//    if (JSON.stringify(currentState) !== JSON.stringify(profile)) {
//      store$.profile.set(profile);
//    }
//  },
//  setHabits: (habits: Tables<"habits">[]) => {
//    //Check for deep equality, maybe use stringify
//    const currentState = store$.habits.get();
//    if (JSON.stringify(currentState) !== JSON.stringify(habits)) {
//      store$.habits.set(habits);
//    }
//  },
//});
