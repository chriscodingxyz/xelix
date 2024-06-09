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

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex  md:justify-between flex-shrink-0">
        <OriginalStats />
        <SortOptions />
      </div>
      <div className="flex-grow overflow-auto border-y  border-primary/10">
        <Invoices />
      </div>

      <div className="flex-center">
        <Button variant={"ghost"} size={"sm"}>
          <Download className="p-1" /> Download .json
        </Button>
      </div>
    </div>
  );
}
