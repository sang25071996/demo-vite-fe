import React, { createContext, ReactNode } from 'react';

type LayoutContextValue = {
  open: boolean;
};

type LayoutProviderProps = {
  children: ReactNode;
  value: LayoutContextValue;
};
const LayoutContext = createContext<LayoutContextValue>({ open: false });

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children, value }) => {
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
