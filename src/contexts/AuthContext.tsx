"use client";

import React, { createContext } from "react";
import { User } from "@/entities/User";

interface IAuthContextValue {
  user: User | null;
}

export const AuthContext = createContext<IAuthContextValue | undefined>(undefined);

interface IAuthProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export function AuthProvider({ children, user }: IAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
