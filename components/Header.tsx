"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Download, FolderOutput } from "lucide-react";
import { useJsonData } from "@/context/JsonDataContext";

export default function Header() {
  const { data } = useJsonData();

  const hasApprovedInvoices =
    data && data.some((invoice) => invoice.status === "approved");

  const approvedData =
    data && data.filter((invoice) => invoice.status === "approved");

  const approvedAmount = approvedData.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  const dataToJson = () => {
    return JSON.stringify(
      {
        pay_run: {
          date: Date.now(),
          amount: approvedAmount,
          invoices: approvedData,
        },
      },
      null,
      2
    );
  };

  const handleExport = () => {
    const blob = new Blob([dataToJson()], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "payrun.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="w-full flex items-center justify-between p-2 border-b font-bold">
      <span>
        <a href="">PayWorks</a>
      </span>
      {data && data.length > 0 && hasApprovedInvoices && (
        <Button onClick={handleExport} variant={"outline"} size={"sm"}>
          Export <FolderOutput className="p-1" /> Approved
        </Button>
      )}

      <ThemeToggle />
    </header>
  );
}
