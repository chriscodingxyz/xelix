import { useJsonData } from "@/context/JsonDataContext";
import React, { useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TInvoice = {
  invoice_number: string;
  due_date: string;
  amount: number;
  status: "pending" | "approved";
  supplier: string;
  currency: string;
  excluded: boolean;
};

export default function Invoices() {
  const { data, sortBy, sortDirection, setData, allCollapsed } = useJsonData();
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  // makes most sense to group by supplier and then sort within each supplier
  const groupBySupplier = (invoices: any[]) => {
    return invoices.reduce((groups, invoice) => {
      const supplier = invoice.supplier;
      if (!groups[supplier]) {
        groups[supplier] = [];
      }
      groups[supplier].push(invoice);
      return groups;
    }, {} as { [key: string]: TInvoice[] });
  };

  // sorting invoices depending on sortBy context value
  const sortInvoices = (
    invoices: TInvoice[],
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

  function approveAllByComp(company: string, includeExcluded: boolean) {
    const updatedData = data.map((inv) => {
      if (inv.supplier === company) {
        if (includeExcluded) {
          return { ...inv, status: "approved", excluded: false };
        } else if (!inv.excluded) {
          return { ...inv, status: "approved" };
        }
      }
      return inv;
    });
    setData(updatedData);
    toast.info(
      `Approved all ${
        includeExcluded ? "including excluded" : "non-excluded"
      } invoices for ${company}`
    );
  }

  function excludeAllByComp(company: string) {
    const updatedData = data.map((inv) => {
      if (inv.supplier === company) {
        return { ...inv, status: "pending", excluded: true };
      }
      return inv;
    });
    setData(updatedData);
    toast.info(`Excluded all invoices for ${company}`);
  }

  const getApprovedCount = (invoices: TInvoice[]) => {
    const approvedCount = invoices.filter(
      (inv) => inv.status === "approved"
    ).length;
    const excludedCount = invoices.filter((inv) => inv.excluded).length;
    const totalCount = invoices.length;
    if (approvedCount === totalCount) {
      return "✅";
    }
    if (excludedCount === totalCount) {
      return "❌";
    } else return `(${approvedCount}/${totalCount})`;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-auto px-4 pb-60">
        {Object.keys(groupedInvoices).map((supplier) => (
          <div key={supplier} className="mb-8">
            <div className="sticky top-0 bg-background z-10">
              <div className="flex justify-between items-center">
                <h2 className="sm:text-lg md:text-xl font-bold">
                  {supplier}{" "}
                  <span className="text-xs">
                    {" "}
                    {getApprovedCount(groupedInvoices[supplier])}
                  </span>
                </h2>

                <div className="flex-center">
                  {groupedInvoices[supplier].some(
                    (inv: TInvoice) => inv.excluded
                  ) ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedSupplier(supplier)}
                          variant={"linkHover2"}
                          size={"extraTiny"}
                          className="text-xs"
                        >
                          Approve
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Approve All Invoices
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Do you want to approve all invoices for {supplier}{" "}
                            or only the non-excluded ones?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              approveAllByComp(supplier, false);
                              setSelectedSupplier(null);
                            }}
                          >
                            Non-Excluded ONLY
                          </AlertDialogAction>
                          <AlertDialogAction
                            onClick={() => {
                              approveAllByComp(supplier, true);
                              setSelectedSupplier(null);
                            }}
                          >
                            Approve All
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button
                      onClick={() => approveAllByComp(supplier, true)}
                      variant={"linkHover2"}
                      size={"extraTiny"}
                      className="text-xs"
                    >
                      Approve
                    </Button>
                  )}
                  {` | `}
                  <Button
                    onClick={() => excludeAllByComp(supplier)}
                    variant={"linkHover2"}
                    size={"extraTiny"}
                    className="text-xs"
                  >
                    Exclude
                  </Button>
                </div>
              </div>
            </div>

            {!allCollapsed && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {sortInvoices(
                  groupedInvoices[supplier],
                  sortBy,
                  sortDirection
                ).map((invoice: any) => (
                  <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
