import { useJsonData } from "@/context/JsonDataContext";
import React from "react";
import InvoiceCard from "./InvoiceCard";

export default function Invoices() {
  const { data, sortBy, sortDirection } = useJsonData();

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

  // sorting invoices depending on sortBy conext value
  const sortInvoices = (
    invoices: any[],
    sortBy: string,
    sortDirection: string
  ) => {
    const sortedInvoices = invoices.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "invoice_number") {
        comparison = a.invoice_number.localeCompare(b.invoice_number);
      } else if (sortBy === "due_date") {
        comparison =
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      } else if (sortBy === "amount") {
        comparison = a.amount - b.amount;
      } else if (sortBy === "status") {
        const statusOrder = { pending: 1, approved: 2 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sortedInvoices;
  };

  const groupedInvoices = groupBySupplier(data || []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-auto p-4">
        {Object.keys(groupedInvoices).map((supplier) => (
          <div key={supplier} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{supplier}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortInvoices(
                groupedInvoices[supplier],
                sortBy,
                sortDirection
              ).map((invoice: any) => (
                <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
