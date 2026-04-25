import { createContext, useContext, useState, useEffect } from "react";

type Mode = "home" | "restaurant";

const AppModeContext = createContext<any>(null);

export const AppModeProvider = ({ children }: any) => {
  // const [mode, setMode] = useState<Mode>("restaurant");
  const [mode, setMode] = useState<Mode>("home");

  useEffect(() => {
    const saved = localStorage.getItem("app_mode") as Mode;
    if (saved) setMode(saved);
  }, []);

  const updateMode = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem("app_mode", newMode);
  };

  return (
    <AppModeContext.Provider value={{ mode, setMode: updateMode }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => useContext(AppModeContext);