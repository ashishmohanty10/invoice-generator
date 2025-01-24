import { ChangeStatus } from "@/components/invoice/change-status";
import { Invoice } from "@/components/invoice/invoice";

import { prisma } from "@/db/db";

import { notFound } from "next/navigation";
import { InvoiceResult } from "@/types/invoice";

export default async function InvoicePage({
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

  const result = (await prisma.invoice.findUnique({
    where: {
      id,
    },
  })) as InvoiceResult | null;

  if (!result) {
    return notFound();
  }

  return (
    <div className="p-10 space-y-8">
      <Invoice invoice={result} />
      <ChangeStatus result={result} />
    </div>
  );
}
