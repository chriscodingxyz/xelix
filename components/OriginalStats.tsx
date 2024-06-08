import { useJsonData } from "@/context/JsonDataContext";
import React from "react";

export default function OriginalStats() {
  const { uploadedJsonData } = useJsonData();

  const totalAmount = uploadedJsonData?.pay_run.total_amount;
  const InvoiceBatchId = uploadedJsonData?.pay_run.id;
  const overallDate = uploadedJsonData?.pay_run.date;

  return (
    <div className="border-2 border-blue-500">
      <p>Total Amount: £{totalAmount.toLocaleString()}</p>
      <p>Invoice Batch Id: {InvoiceBatchId}</p>
      <p>Overall Date: {overallDate}</p>
    </div>
  );
}
