import React from "react";

export default function InvoiceCard({ invoice }: any) {
  return (
    <div className="border rounded-lg shadow-md p-4 m-2 bg-background">
      <h3 className="text-xl font-bold mb-2">{invoice.invoice_number}</h3>
      <p>
        <strong>Supplier:</strong> {invoice.supplier}
      </p>
      <p>
        <strong>Amount:</strong> {invoice.currency} {invoice.amount.toFixed(2)}
      </p>
      <p>
        <strong>Due Date:</strong> {invoice.due_date}
      </p>
      <p>
        <strong>Status:</strong> {invoice.status}
      </p>
    </div>
  );
}
