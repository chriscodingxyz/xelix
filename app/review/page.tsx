"use client";

import Invoices from "@/components/Invoices";
import OriginalStats from "@/components/OriginalStats";
import SortOptions from "@/components/SortOptions";
import { Button } from "@/components/ui/button";
import { useJsonData } from "@/context/JsonDataContext";
import { Download } from "lucide-react";
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
  //revert back to here
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-center w-full md:w-auto px-4 pb-2">
        <OriginalStats />
        <SortOptions />
      </div>
      <div className="flex-grow overflow-hidden">
        <Invoices />
      </div>
    </div>
  );
}
