import { useJsonData } from "@/context/JsonDataContext";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OriginalStats() {
  const { uploadedJsonData } = useJsonData();

  const totalAmount = uploadedJsonData?.pay_run.total_amount;
  const InvoiceBatchId = uploadedJsonData?.pay_run.id;
  const overallDate = uploadedJsonData?.pay_run.date;

  return (
    <div className=" w-full p-4 pt-0 flex-center">
      {/* <h1 className="text-2xl font-bold">Stats</h1> */}
      <div>
        <p>Total Amount: £{totalAmount.toLocaleString()}</p>
        <p>Invoice Batch Id: {InvoiceBatchId}</p>
        <p>Overall Date: {overallDate}</p>
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
