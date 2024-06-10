"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useJsonData } from "@/context/JsonDataContext";
import { ChevronDownIcon, ArrowDownUp, CircleEllipsis } from "lucide-react";
import { cn } from "@/lib/utils";

type TInvoice = {
  invoice_number: string;
  due_date: string;
  amount: number;
  status: "pending" | "approved";
  supplier: string;
  currency: string;
  excluded: boolean;
};

const InvoiceActions = ({ invoice }: { invoice: TInvoice }) => {
  const { data, setData } = useJsonData();

  const handleApprove = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, status: "approved", excluded: false };
      }
      return inv;
    });
    setData(updatedData);
  };

  const handleExclude = (invoiceNumber: string) => {
    const updatedData = data.map((inv) => {
      if (inv.invoice_number === invoiceNumber) {
        return { ...inv, excluded: true, status: "pending" };
      }
      return inv;
    });
    setData(updatedData);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <CircleEllipsis className="p-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
        <DropdownMenuItem onClick={() => handleApprove(invoice.invoice_number)}>
          ✅ Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExclude(invoice.invoice_number)}>
          ❌ Exclude
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const columns: ColumnDef<TInvoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice Number
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Supplier
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={cn("capitalize", {
          "text-green-500": row.getValue("status") === "approved",
        })}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "excluded",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Excluded
        <ArrowDownUp className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={cn("capitalize", {
          "text-red-500": row.getValue("excluded"),
        })}
      >
        {row.getValue("excluded") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <InvoiceActions invoice={row.original} />,
  },
];

function InvoiceTableCN() {
  const { data, setData } = useJsonData();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleApproveSelected = () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.invoice_number);
    const updatedData = data.map((inv) => {
      if (selectedRowIds.includes(inv.invoice_number)) {
        return { ...inv, status: "approved", excluded: false };
      }
      return inv;
    });
    setData(updatedData);
  };

  const handleExcludeSelected = () => {
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.invoice_number);
    const updatedData = data.map((inv) => {
      if (selectedRowIds.includes(inv.invoice_number)) {
        return { ...inv, excluded: true, status: "pending" };
      }
      return inv;
    });
    setData(updatedData);
  };

  return (
    <div className="w-full flex flex-col h-full px-2">
      <div className="flex items-center py-1">
        <Input
          placeholder="Filter by supplier..."
          value={
            (table.getColumn("supplier")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("supplier")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex space-x-2 py-1">
        <Button
          onClick={handleApproveSelected}
          variant="secondary"
          size={"tiny"}
        >
          Approve Selected
        </Button>
        <Button
          onClick={handleExcludeSelected}
          variant="secondary"
          size={"tiny"}
        >
          Exclude Selected
        </Button>
      </div>
      <div className="flex-grow overflow-auto rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground py-4">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}

export default InvoiceTableCN;
