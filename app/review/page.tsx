"use client";

import Invoices from "@/components/Invoices";
import OriginalStats from "@/components/OriginalStats";
import SortOptions from "@/components/SortOptions";
import { useJsonData } from "@/context/JsonDataContext";
import { redirect } from "next/navigation";
import React from "react";

export default function ReviewPage() {
  const { uploadedJsonData, data, setData } = useJsonData();

  if (!uploadedJsonData) {
    redirect("/upload");
  }
  // this was getting re-rendered and resetting the data every time, it will only set the data if there was none to begin with
  if (!data || data.length === 0) {
    setData(uploadedJsonData.pay_run.invoices);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden pt-16">
      <div className="flex flex-col md:flex-row md:justify-between">
        <OriginalStats />
        <SortOptions />
      </div>

      <div className="flex-grow overflow-auto ">
        <Invoices />
      </div>
    </div>
  );
}
