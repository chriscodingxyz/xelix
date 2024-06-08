"use client";

import Invoices from "@/components/Invoices";
import OriginalStats from "@/components/OriginalStats";
import SortOptions from "@/components/SortOptions";
import { useJsonData } from "@/context/JsonDataContext";
import { redirect } from "next/navigation";
import React from "react";

export default function ReviewPage() {
  const { uploadedJsonData, setData } = useJsonData();

  if (!uploadedJsonData) {
    redirect("/upload");
  }

  setData(uploadedJsonData.pay_run.invoices);

  return (
    <div className="flex flex-col h-screen overflow-hidden pt-16">
      <OriginalStats />
      <SortOptions />
      <div className="flex-grow overflow-auto ">
        <Invoices />
      </div>
    </div>
  );
}
