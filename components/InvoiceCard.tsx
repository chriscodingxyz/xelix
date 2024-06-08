"use client";

import { useJsonData } from "@/context/JsonDataContext";
import { capitalizeWords, cn } from "@/lib/utils";
import { CalendarClock, EllipsisVertical, RotateCcw } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function InvoiceCard({ invoice }: any) {
  const { data, sortBy, setData } = useJsonData();

  const handleApprove = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, status: "approved" };
      }
      return inv;
    });
    setData(updatedData);
    console.log("Updated data:", updatedData);
  };

  const handlePending = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, status: "pending" };
      }
      return inv;
    });
    setData(updatedData);
    console.log("Updated data:", updatedData);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 m-2 bg-background">
      <p
        className={cn("text-right", sortBy === "invoice_number" && "font-bold")}
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
          {capitalizeWords(invoice.status)}
        </span>
        <span>
          {invoice.status === "approved" ? (
            <Button
              onClick={() => handlePending(invoice.invoice_number)}
              variant="ghost"
              size="sm"
            >
              <RotateCcw className="p-1" />
            </Button>
          ) : (
            // <Button
            //   onClick={() => handlePending(invoice.invoice_number)}
            //   size={"sm"}
            //   variant={"ghost"}
            // >
            //   <EllipsisVertical className="p-1" />
            // </Button>
            <Button
              onClick={() => handleApprove(invoice.invoice_number)}
              variant="outline"
              size="sm"
            >
              Approve
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}
