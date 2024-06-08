"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface JsonDataContextType {
  uploadedJsonData: any;
  setUploadedJsonData: (data: any) => void;
  data: [];
  setData: (data: any) => void;
  sortBy: "invoice_number" | "date" | "amount" | "status";
  setSortBy: (sortBy: "invoice_number" | "date" | "amount" | "status") => void;
}

// ok lets create the context
const JsonDataContext = createContext<JsonDataContextType | undefined>(
  undefined
);

// now lets create the provider component
export const JsonDataProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedJsonData, setUploadedJsonData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [sortBy, setSortBy] = useState<
    "invoice_number" | "date" | "amount" | "status"
  >("invoice_number");

  return (
    <JsonDataContext.Provider
      value={{
        uploadedJsonData,
        setUploadedJsonData,
        data,
        setData,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </JsonDataContext.Provider>
  );
};

// custom hook to consume it
export const useJsonData = () => {
  const context = useContext(JsonDataContext);
  if (!context) {
    throw new Error("useJsonData must be used within a JsonDataProvider");
  }
  return context;
};
