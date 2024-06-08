"use client";

import React from "react";
import { Button } from "./ui/button";
import { useJsonData } from "@/context/JsonDataContext";

export default function SortOptions() {
  const { sortBy, setSortBy, sortDirection, setSortDirection } = useJsonData();

  const handleSort = (
    criteria: "invoice_number" | "date" | "amount" | "status"
  ) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex-center space-x-2">
      <Button onClick={() => handleSort("invoice_number")}>
        Sort by Invoice Number
      </Button>
      <Button onClick={() => handleSort("date")}>Sort by Date</Button>
      <Button onClick={() => handleSort("amount")}>Sort by Amount</Button>
      <Button onClick={() => handleSort("status")}>Sort by Status</Button>
    </div>
  );
}
