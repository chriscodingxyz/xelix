import { useJsonData } from "@/context/JsonDataContext";
import { cn } from "@/lib/utils";
import React from "react";

export default function InvoiceCard({ invoice }: any) {
  const { sortBy } = useJsonData();

  return (
    <div className="border rounded-lg shadow-md p-4 m-2 bg-background">
      <h3 className="text-xl font-bold mb-2">{invoice.invoice_number}</h3>
      <p>{invoice.supplier}</p>
      <p className={cn(sortBy === "amount" && "font-bold")}>
        {invoice.currency} {invoice.amount.toFixed(2)}
      </p>
      <p className={cn(sortBy === "due_date" && "font-bold")}>
        {invoice.due_date}
      </p>
      <p className={cn(sortBy === "status" && "font-bold")}>{invoice.status}</p>
    </div>
  );
}
