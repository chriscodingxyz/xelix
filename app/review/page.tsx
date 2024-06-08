"use client";

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

  setData(uploadedJsonData.pay_run.invoices);

  return (
    <div className="flex flex-col h-screen overflow-hidden pt-16">
      <OriginalStats />
      <SortOptions />
      <div className="flex-grow overflow-auto border-2 border-green-500">
        {JSON.stringify(data)}
      </div>
    </div>
  );
}
