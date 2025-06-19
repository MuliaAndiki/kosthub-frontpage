"use client";
import { store, persistor } from "./stores";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProvinderStore({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
