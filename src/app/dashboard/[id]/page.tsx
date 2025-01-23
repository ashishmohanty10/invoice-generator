import { ChangeStatus } from "@/components/invoice/change-status";
import { Badge } from "@/components/ui/badge";

import { prisma } from "@/db/db";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function Invoices({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  if (typeof id !== "string") {
    throw new Error("Invalid invoice ID");
  }

  const result = await prisma.invoice.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    return notFound();
  }

  return (
    <div className="p-10">
      <div className="flex items-center gap-x-5 mb-8 w-full justify-between">
        <div className="flex items-center gap-x-5">
          <h1 className="text-3xl font-semibold flex items-center">
            Invoice <span className="text-sm ml-2 text-gray-800">/{id}</span>
          </h1>

          <Badge
            className={cn(
              "rounded-full",
              result.status === "OPEN" && "bg-blue-500",
              result.status === "CANCELLED" && "bg-red-500",
              result.status === "PAID" && "bg-green-700",
              result.status === "PENDING" && "bg-yellow-500"
            )}
          >
            {result?.status}
          </Badge>
        </div>

        <ChangeStatus result={result} />
      </div>

      <div className="max-w-md">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">${result.amount}</h2>
        </div>

        <h3 className="text-xl font-semibold mb-8">Billing Details</h3>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Invoice Id:</p>
            {result.id}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Invoice Date:</p>
            {result.createdAt.toLocaleDateString("en-US")}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Billing Name:</p>
            {result.name}
          </div>

          <div className="flex items-center justify-between">
            <p className="font-semibold">Billing Email:</p>
            {result.email}
          </div>
        </div>
      </div>
    </div>
  );
}
