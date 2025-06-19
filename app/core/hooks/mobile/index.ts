"use client";
import { useEffect, useState } from "react";
import { MobileType } from "../../../types/hook";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): MobileType {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    checkIsMobile();
    mql.addEventListener("change", checkIsMobile);

    return () => {
      mql.removeEventListener("change", checkIsMobile);
    };
  }, []);

  return { isMobile };
}
