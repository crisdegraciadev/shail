"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Mail } from "../types/types";

type MailContextProps = {
  selectedMail: Mail | null;
  setSelectedMail: Dispatch<SetStateAction<Mail | null>>;
};

export const MailContext = createContext<MailContextProps | null>(null);

export default function MailContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  return (
    <MailContext.Provider value={{ selectedMail, setSelectedMail }}>
      {children}
    </MailContext.Provider>
  );
}

export const useMailContext = () => {
  const context = useContext(MailContext);

  if (!context) {
    throw new Error("MailContext should be used inside the provider");
  }

  return context;
};
