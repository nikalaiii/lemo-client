'use client';
import { ThreadInterface } from "@/components/community/thread";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface GlobalUser {
    id: string;
    avatarUrl?: string;
    name: string;
    posts: ThreadInterface[];
}

// 1. Описуємо тип стейту
interface GlobalUserType {
  user: GlobalUser | null;
  setGlobalUser: (user: GlobalUser | null) => void;
}

// 2. Створюємо Context
const GlobalUserContext = createContext<GlobalUserType | undefined>(undefined);

// 3. Створюємо провайдер
export const GlobalUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setGlobalUser] = useState<GlobalUser | null>(null);

  return (
    <GlobalUserContext.Provider value={{ user, setGlobalUser }}>
      {children}
    </GlobalUserContext.Provider>
  );
};

// 4. Хук для використання
export const useGlobalState = () => {
  const context = useContext(GlobalUserContext);
  if (!context) throw new Error("useGlobalState must be used within GlobalStateProvider");
  return context;
};
