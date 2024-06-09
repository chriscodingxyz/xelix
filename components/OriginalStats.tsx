import { useJsonData } from "@/context/JsonDataContext";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OriginalStats() {
  const { uploadedJsonData, data } = useJsonData();

  const totalAmount = data.reduce((acc, inv) => acc + inv.amount, 0);
  const invoiceBatchId = uploadedJsonData?.pay_run.id;
  const overallDate = uploadedJsonData?.pay_run.date;

  const pendingCount = data.filter((inv) => inv.status === "pending").length;
  const approvedCount = data.filter((inv) => inv.status === "approved").length;
  const excludedCount = data.filter((inv) => inv.excluded).length;
  const approvableCount = data.filter((inv) => !inv.excluded).length;

  const totalApprovableAmount = data
    .filter((inv) => !inv.excluded)
    .reduce((acc, inv) => acc + inv.amount, 0);
  const approvedAmount = data
    .filter((inv) => inv.status === "approved")
    .reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="w-full p-4 pt-0 flex flex-wrap justify-between text-sm">
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold">Overview</h2>
          <p>Total Amount: £{totalAmount.toLocaleString()}</p>
          <p>Invoice Batch Id: {invoiceBatchId}</p>
          <p>Overall Date: {overallDate}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold">
            Status Counts ({approvedCount}/{approvableCount})
          </h2>
          <p>Pending: {pendingCount}</p>
          <p>Approved: {approvedCount}</p>
          <p>Excluded: {excludedCount}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold">Financial Overview</h2>
          <p>
            Total Approvable Amount: £{totalApprovableAmount.toLocaleString()}
          </p>
          <p>Approved Amount: £{approvedAmount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// return (
//   <div className=" w-full p-4 pt-0">
//     <Accordion type="single" collapsible>
//       <AccordionItem value="item-1">
//         <AccordionTrigger>Stats</AccordionTrigger>
//         <AccordionContent>
//           <p>Total Amount: £{totalAmount.toLocaleString()}</p>
//           <p>Invoice Batch Id: {InvoiceBatchId}</p>
//           <p>Overall Date: {overallDate}</p>
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   </div>
// );
// }
