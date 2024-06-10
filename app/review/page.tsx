"use client";

import InvoiceTableCN from "@/components/InvoiceTableCN";
import Invoices from "@/components/Invoices";
import OriginalStats from "@/components/OriginalStats";
import SortOptions from "@/components/SortOptions";
import { useJsonData } from "@/context/JsonDataContext";
import { redirect } from "next/navigation";
import React from "react";

export default function ReviewPage() {
  const { uploadedJsonData, data, setData, isDataTable } = useJsonData();

  if (!uploadedJsonData) {
    redirect("/upload");
  }

  if (!data || data.length === 0) {
    setData(uploadedJsonData.pay_run.invoices);
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex flex-col items-center w-full md:w-auto px-4 pb-2">
        <OriginalStats />
        {!isDataTable && <SortOptions />}
      </div>

      <div className="flex-grow overflow-hidden">
        {isDataTable ? <InvoiceTableCN /> : <Invoices />}
      </div>
    </div>
  );
}
