import { Status } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { DeleteInvoice } from "./delete-invoice";

export interface InvoiceProps {
  invoice: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    amount: number;
    description: string;
    status: Status;
  };
}

export function Invoice({ invoice }: InvoiceProps) {
  return (
    <>
      <div className="flex items-center gap-x-5 mb-8 w-full justify-between">
        <div className="flex items-center gap-x-5">
          <h1 className="text-3xl font-semibold flex items-center">
            Invoice{" "}
            <span className="text-sm ml-2 text-gray-800">/{invoice.id}</span>
          </h1>

          <Badge
            className={cn(
              "rounded-full",
              invoice.status === "OPEN" && "bg-blue-500",
              invoice.status === "CANCELLED" && "bg-red-500",
              invoice.status === "PAID" && "bg-green-700",
              invoice.status === "PENDING" && "bg-yellow-500"
            )}
          >
            {invoice.status}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <DeleteInvoice invoice={invoice} />
        </div>
      </div>

      <div className="max-w-md">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">${invoice.amount}</h2>
        </div>

        <h3 className="text-xl font-semibold mb-8">Billing Details</h3>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Invoice Id:</p>
            {invoice.id}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Invoice Date:</p>
            {invoice.createdAt.toLocaleDateString("en-US")}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Billing Name:</p>
            {invoice.name}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Billing Email:</p>
            {invoice.email}
          </div>
        </div>
      </div>
    </>
  );
}
