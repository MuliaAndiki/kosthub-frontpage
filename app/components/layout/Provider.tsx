"use client";
import { useState, useEffect } from "react";
import { userType } from "../type/API";

import contex from "../component/hooks/auth";
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
