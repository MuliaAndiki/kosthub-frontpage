"use client";
import React, { createContext, useContext } from "react";
import { userType } from "../../type/API";

const contex = createContext<{
  currentUser: userType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<userType | null>>;
} | null>(null);

export const useHook = () => {
  const KostHub = useContext(contex);
  if (!KostHub) {
    throw new Error("");
  }
  return KostHub;
};

export default contex;
