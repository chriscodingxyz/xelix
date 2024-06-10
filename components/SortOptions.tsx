"use client";

import React from "react";
import { Button } from "./ui/button";
import { useJsonData } from "@/context/JsonDataContext";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SortOptions() {
  const {
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    allCollapsed,
    handleCollapse,
  } = useJsonData();

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
      size={"tiny"}
      onClick={() => handleSort(criteria)}
      className="flex items-center space-x-2 text-xs"
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
    <div className="flex-center flex-col items-center">
      {/* <h1 className="text-2xl font-bold">Sort Options</h1> */}

      <div className="flex gap-2 flex-wrap justify-center">
        {renderButton("invoice_number", "Invoice #")}
        {renderButton("due_date", "Date")}
        {renderButton("amount", "Amount")}
        {renderButton("status", "Status")}
        <Button
          title="Collapse / Expand all"
          variant={"secondary"}
          size={"tiny"}
          onClick={handleCollapse}
        >
          {allCollapsed ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
        </Button>
        {/* <Checkbox /> */}
      </div>
    </div>
  );
}
