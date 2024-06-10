"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface JsonDataContextType {
  uploadedJsonData: any;
  setUploadedJsonData: (data: any) => void;
  data: any[];
  setData: (data: any[]) => void;
  sortBy: "invoice_number" | "due_date" | "amount" | "status";
  setSortBy: (
    sortBy: "invoice_number" | "due_date" | "amount" | "status"
  ) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  allCollapsed: boolean;
  handleCollapse: () => void;
  isDataTable: boolean;
  setIsDataTable: (isDataTable: boolean) => void;
  handleIsDataTable: () => void;
}

// ok lets create the context
const JsonDataContext = createContext<JsonDataContextType | undefined>(
  undefined
);

// now lets create the provider component
export const JsonDataProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedJsonData, setUploadedJsonData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<
    "invoice_number" | "due_date" | "amount" | "status"
  >("invoice_number");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [isDataTable, setIsDataTable] = useState(true);

  const handleCollapse = () => {
    setAllCollapsed(!allCollapsed);
  };

  const handleIsDataTable = () => {
    setIsDataTable(!isDataTable);
  };

  return (
    <JsonDataContext.Provider
      value={{
        uploadedJsonData,
        setUploadedJsonData,
        data,
        setData,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        allCollapsed,
        handleCollapse,
        isDataTable,
        setIsDataTable,
        handleIsDataTable,
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
