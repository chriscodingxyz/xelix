"use client";

import React from "react";
import { Button } from "./ui/button";
import { useJsonData } from "@/context/JsonDataContext";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function SortOptions() {
  const { sortBy, setSortBy, sortDirection, setSortDirection } = useJsonData();

  const handleSort = (
    criteria: "invoice_number" | "due_date" | "amount" | "status"
  ) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
  };

  const renderButton = (
    criteria: "invoice_number" | "due_date" | "amount" | "status",
    label: string
  ) => (
    <Button
      variant={sortBy === criteria ? "default" : "outline"}
      onClick={() => handleSort(criteria)}
      className="flex items-center space-x-2"
    >
      <span>{label}</span>
      {sortBy === criteria &&
        (sortDirection === "asc" ? (
          <ArrowUp size={16} />
        ) : (
          <ArrowDown size={16} />
        ))}
    </Button>
  );

  return (
    <div className="flex flex-col items-center w-full p-4 pt-0">
      <h1 className="text-2xl font-bold">Sort Options</h1>
      <div className="flex gap-2 flex-wrap justify-center">
        {renderButton("invoice_number", "Invoice #")}
        {renderButton("due_date", "Date")}
        {renderButton("amount", "Amount")}
        {renderButton("status", "Status")}
      </div>
    </div>
  );
}
