"use client";
import { useState, useEffect } from "react";
import { userType } from "../types/API";

import contex from "../core/hooks/auth/auth";
import AOS from "aos";
import "aos/dist/aos.css";

export const ProvinderKost = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <contex.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </contex.Provider>
  );
};
