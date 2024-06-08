"use client";

import { useJsonData } from "@/context/JsonDataContext";
import { cn } from "@/lib/utils";
import { CalendarClock } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function InvoiceCard({ invoice }: any) {
  const { data, sortBy, setData } = useJsonData();

  function handleStatus(invoiceNumber: string) {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, status: "approved" };
      }
      return inv;
    });
    setData(updatedData);
    console.log("updated data ==>>>", updatedData);
  }

  return (
    <div className="border rounded-lg shadow-md p-4 m-2 bg-background">
      <p
        className={cn(
          "text-right ",
          sortBy === "invoice_number" && "font-bold"
        )}
      >
        {invoice.invoice_number}
      </p>
      <p>{invoice.supplier}</p>
      <p className={cn(sortBy === "amount" && "font-bold")}>
        {invoice.currency === "GBP" ? "£" : null}{" "}
        {invoice.amount.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
      </p>
      <p className={cn("flex", sortBy === "due_date" && "font-bold")}>
        <CalendarClock className="pr-1" /> {invoice.due_date}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={cn(
            sortBy === "status" && "font-bold",
            invoice.status === "approved" && "text-green-500"
          )}
        >
          {invoice.status}
        </span>
        <span>
          <Button
            onClick={() => handleStatus(invoice.invoice_number)}
            variant={"outline"}
            size={"sm"}
          >
            {invoice.status === "approved" ? "reset" : "Approve"}
          </Button>
        </span>
      </div>
    </div>
  );
}
