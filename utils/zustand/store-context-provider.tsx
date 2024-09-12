"use client";

import React, { createContext, ReactNode } from "react";
import useStore from "./store";

const AppStoreContext = createContext<typeof useStore | null>(null);

interface AppStoreProviderProps {
  children: ReactNode;
}

const AppStoreProvider: React.FC<AppStoreProviderProps> = ({ children }) => {
  const [store] = React.useState(() => useStore);

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
};

export { AppStoreContext, AppStoreProvider };
