"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Download, FolderOutput, Smartphone } from "lucide-react";
import { useJsonData } from "@/context/JsonDataContext";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data, uploadedJsonData } = useJsonData();

  const pathname = usePathname();

  const hasApprovedInvoices =
    data && data.some((invoice) => invoice.status === "approved");

  const hasPendingInvoices =
    data && data.some((invoice) => invoice.status === "pending");

  const approvedData =
    data && data.filter((invoice) => invoice.status === "approved");

  const pendingData =
    data && data.filter((invoice) => invoice.status === "pending");

  const pendingAmount = pendingData.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  const approvedAmount = approvedData.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );
  //to make sure the pending and approved dates match exactly, since small delay between them ebing run
  const dateNow = Date.now();

  //going to add a toast before proceeding, still want the button there to show usere there will be an export button for them
  const hasPendingButNotExcluded =
    data &&
    data.some((invoice) => invoice.status === "pending" && !invoice.excluded);

  const dataToJson = (
    invoices: any[],
    amount: number,
    status: "approved" | "pending"
  ) => {
    return JSON.stringify(
      {
        [`${status}_pay_run`]: {
          date: dateNow,
          amount: amount,
          count: invoices.length,
          invoices: invoices,
        },
      },
      null,
      2
    );
  };

  //just asked chatgpt for exporting to json logic
  const handleExportApproved = () => {
    const blob = new Blob(
      [dataToJson(approvedData, approvedAmount, "approved")],
      {
        type: "application/json;charset=utf-8",
      }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `approved_${uploadedJsonData.pay_run.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPending = () => {
    const blob = new Blob([dataToJson(pendingData, pendingAmount, "pending")], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pending_${uploadedJsonData.pay_run.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="w-full flex items-center justify-between p-2 border-b font-bold">
      <span>
        <a href="/">PayWorks</a>
      </span>
      <div className="flex space-x-4">
        {data && data.length > 0 && hasApprovedInvoices ? (
          <Button
            onClick={async () => {
              if (hasPendingButNotExcluded) {
                toast.warning(
                  "Please first exclude pending invoices before exporting approved invoices"
                );
                return;
              }

              handleExportApproved();
              if (hasPendingInvoices) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                toast("Export Pending also?", {
                  action: {
                    label: "Export",
                    onClick: () => handleExportPending(),
                  },
                });
              }
            }}
            variant={"outline"}
            size={"sm"}
          >
            Export <FolderOutput className="p-1" />
          </Button>
        ) : (
          pathname === "/upload" && (
            <Link className="hidden sm:flex " href="/qr">
              <Button size={"sm"}>
                View on mobile
                <Smartphone className="p-1" />
              </Button>
            </Link>
          )
        )}
      </div>
      <ThemeToggle />
    </header>
  );
}
