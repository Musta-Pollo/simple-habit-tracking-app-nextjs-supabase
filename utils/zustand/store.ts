// store.ts
import create, { createStore, StateCreator } from "zustand";
import { combine } from "zustand/middleware";
import { createDataSlice, defaultDataSlice } from "./data-slice";
import {
  createSearchSettingsSlice,
  defaultSearchSettingsSlice,
} from "./search-settings-slice";
import { DataSlice, SearchSettingsSlice } from "./schema";
import { immer } from "zustand/middleware/immer";

export type Store = [
  typeof defaultDataSlice,
  typeof defaultSearchSettingsSlice,
];

//const useStore = createStore(
//  combine([defaultDataSlice, defaultSearchSettingsSlice], (set, get) => ({
//    ...createDataSlice(set, get),
//    ...createSearchSettingsSlice(set, get),
//  }))
//);
const useStore = createStore<CombinedState>()(
  immer((...api) => ({
    data: createDataSlice(...api),
    searchSettings: createSearchSettingsSlice(...api),
  }))
);

export interface CombinedState {
  data: DataSlice;
  searchSettings: SearchSettingsSlice;
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [["zustand/immer", never]],
  [["zustand/immer", Partial<T>]],
  T
>;

export default useStore;
