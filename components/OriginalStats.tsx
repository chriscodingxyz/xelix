import { useJsonData } from "@/context/JsonDataContext";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileBarChart2 } from "lucide-react";
//revert back to
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
    <div className="w-full mb-2">
      <Accordion defaultValue="item-1" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-2">
            <span className="flex gap-2">
              <FileBarChart2 />
              Summary
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full flex flex-col md:flex-row justify-between text-xs gap-2">
              <div className="flex-1">
                <div className="border rounded-lg shadow-md p-4 bg-background flex justify-between">
                  <div>
                    <h2 className="font-bold">Overview</h2>
                    <p>Total: £{totalAmount.toLocaleString()}</p>
                    <p>Approvable: £{totalApprovableAmount.toLocaleString()}</p>
                    <p>Invoice Batch Id: {invoiceBatchId}</p>
                    <p>Date: {overallDate}</p>
                  </div>
                  <div>
                    <h2 className="font-bold">
                      Status ({approvedCount}/{approvableCount})
                    </h2>
                    <p className="text-green-500">Approved: {approvedCount}</p>
                    <p>Pending: {pendingCount}</p>

                    <p className="text-red-500">Excluded: {excludedCount}</p>

                    <p>Approved: £{approvedAmount.toLocaleString()}</p>
                  </div>
                  {/* <div>
                    <h2 className="font-bold">Status</h2>
                    <p>
                      Total Approvable: £
                      {totalApprovableAmount.toLocaleString()}
                    </p>
                    <p>Approved Amount: £{approvedAmount.toLocaleString()}</p>
                  </div> */}
                </div>
              </div>
              {/* <div className="flex-1 p-1">
                <div className="bg-background shadow-md rounded-lg p-4">
                  <h2 className="font-bold">
                    Status Counts and Financial Overview
                  </h2>
                  <div className="flex justify-between">
                    <div>
                      <p>Pending: {pendingCount}</p>
                      <p>Approved: {approvedCount}</p>
                      <p>Excluded: {excludedCount}</p>
                    </div>
                    <div>
                      <p>
                        Total Approvable: £
                        {totalApprovableAmount.toLocaleString()}
                      </p>
                      <p>Approved Amount: £{approvedAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
