import { CombinedState } from "@/utils/zustand/store";
import { AppStoreContext } from "@/utils/zustand/store-context-provider";
import React from "react";
import { useStore } from "zustand";

type UseStoreType = typeof useStore;
type UseStoreParams = Parameters<UseStoreType>;
type SelectorType = UseStoreParams[1];

export const useAppStore = <T, U>(selector: (state: CombinedState) => U): U => {
  const store = React.useContext(AppStoreContext);
  if (!store) {
    throw new Error("Missing BearStoreProvider");
  }
  return useStore(store, selector);
};

export const useAppStoreListen = <T, U>(
  selector: (state: CombinedState) => U
): U => {
  const store = React.useContext(AppStoreContext);
  if (!store) {
    throw new Error("Missing BearStoreProvider");
  }
  return useStore(store, selector);
};
