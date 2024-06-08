import { useJsonData } from "@/context/JsonDataContext";
import { cn } from "@/lib/utils";
import { CalendarClock } from "lucide-react";
import React from "react";

export default function InvoiceCard({ invoice }: any) {
  const { sortBy } = useJsonData();

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
      <p className={cn(sortBy === "status" && "font-bold")}>{invoice.status}</p>
    </div>
  );
}
