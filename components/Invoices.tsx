// components/Invoices.tsx

import { useJsonData } from "@/context/JsonDataContext";
import React from "react";
import InvoiceCard from "./InvoiceCard";

export default function Invoices() {
  const { data } = useJsonData();

  // makes most sense to group by supplier and then sort within each supplier
  const groupBySupplier = (invoices: any[]) => {
    return invoices.reduce((groups, invoice) => {
      const supplier = invoice.supplier;
      if (!groups[supplier]) {
        groups[supplier] = [];
      }
      groups[supplier].push(invoice);
      return groups;
    }, {} as { [key: string]: any[] });
  };

  const groupedInvoices = groupBySupplier(data || []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-auto p-4">
        {Object.keys(groupedInvoices).map((supplier) => (
          <div key={supplier} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{supplier}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedInvoices[supplier].map((invoice: any) => (
                <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
