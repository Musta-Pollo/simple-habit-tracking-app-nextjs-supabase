import { SearchSettingsSlice, VisibilityFilter } from "./schema";
import { StateSlice } from "./store";

// SearchSettingsSlice default data
export const defaultSearchSettingsSlice: SearchSettingsSlice = {
  projectSelectedId: undefined,
  habitSelectedId: undefined,
  visibilityFilter: VisibilityFilter.All,
  setSelectedProjectId: () => {},
  setSelectedHabitId: () => {},
  setVisibilityFilter: () => {},
  showToday: () => false,
  showTomorrow: () => false,
  showAfterTomorrow: () => false,
  isCollapsed: false,
  setIsCollapsed: () => false,
  isFilterSheetOpen: false,
  setIsFilterSheetOpen: () => false,
  screenWidth: "md",
  setScreenWidth: () => {},
};

export const createSearchSettingsSlice: StateSlice<SearchSettingsSlice> = (
  set,
  get
): SearchSettingsSlice => ({
  ...defaultSearchSettingsSlice,
  setSelectedProjectId: (id) =>
    set((state) => {
      state.searchSettings.projectSelectedId = id;
    }),
  setSelectedHabitId: (id) =>
    set((state) => {
      if (state.searchSettings.habitSelectedId !== id) {
        state.searchSettings.habitSelectedId = id;
      }
    }),
  setVisibilityFilter: (filter) =>
    set((state) => {
      state.searchSettings.visibilityFilter = filter;
    }),
  showToday: () => {
    const { visibilityFilter } = get().searchSettings;
    console.log("visibilityFilter", visibilityFilter);
    return (
      visibilityFilter === VisibilityFilter.Today ||
      visibilityFilter === VisibilityFilter.All
    );
  },
  showTomorrow: () => {
    const { visibilityFilter } = get().searchSettings;
    return (
      visibilityFilter === VisibilityFilter.Tommorow ||
      visibilityFilter === VisibilityFilter.All
    );
  },
  showAfterTomorrow: () => {
    const { visibilityFilter } = get().searchSettings;
    return (
      visibilityFilter === VisibilityFilter.After_Tommorow ||
      visibilityFilter === VisibilityFilter.All
    );
  },
  setIsCollapsed(value) {
    set((state) => {
      state.searchSettings.isCollapsed = value;
    });
  },
  setIsFilterSheetOpen(value) {
    set((state) => {
      state.searchSettings.isFilterSheetOpen = value;
    });
  },
  setScreenWidth(value) {
    set((state) => {
      state.searchSettings.screenWidth = value;
    });
  },
});

//
