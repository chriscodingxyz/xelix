"use client";

import { useJsonData } from "@/context/JsonDataContext";
import { capitalizeWords, cn } from "@/lib/utils";
import { CalendarClock, EllipsisVertical, RotateCcw } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  };

  const handlePending = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, status: "pending" };
      }
      return inv;
    });
    setData(updatedData);
  };

  const handleExclude = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, excluded: !inv.excluded, status: "pending" };
      }
      return inv;
    });
    setData(updatedData);
  };

  const isExcluded = invoice.excluded;

  return (
    <div
      className={cn(
        "border rounded-lg shadow-md p-4 m-2 bg-background",
        isExcluded && "opacity-50"
      )}
    >
      {/* <div>
        {invoice.status} / {isExcluded.toString()}
      </div> */}
      <div className="flex justify-between">
        <span>{invoice.supplier}</span>

        <span className={cn("", sortBy === "invoice_number" && "font-bold")}>
          {invoice.invoice_number}
        </span>
      </div>

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
            "text-xs",
            sortBy === "status" && "font-bold",
            invoice.status === "approved" && "text-green-500"
          )}
        >
          {capitalizeWords(invoice.status)}{" "}
          {invoice.status === "approved" && "✅"}
        </span>

        <span className="flex items-center space-x-2">
          {invoice.status === "approved" ? (
            <>
              <Button
                onClick={() => handlePending(invoice.invoice_number)}
                variant="ghost"
                size="tiny"
              >
                <RotateCcw className="p-1" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleExclude(invoice.invoice_number)}
                  >
                    ❌ Exclude
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : isExcluded ? (
            <>
              <Badge variant="outline">❌ Excluded</Badge>
              <Button
                onClick={() => handleExclude(invoice.invoice_number)}
                variant="ghost"
                size="tiny"
              >
                <RotateCcw className="p-1" />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleApprove(invoice.invoice_number)}
                variant="secondary"
                size="tiny"
              >
                Approve
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleExclude(invoice.invoice_number)}
                  >
                    ❌ Exclude
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
