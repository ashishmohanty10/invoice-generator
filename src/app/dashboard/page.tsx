import { TableDemo } from "@/components/dashboard/table";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-md font-semibold">Invoices</h1>
      <div className="flex justify-end w-full mb-10">
        <Button asChild>
          <Link href="/dashboard/new" className="flex items-center gap-x-2">
            <BadgePlus />
            Create Invoice
          </Link>
        </Button>
      </div>
      <TableDemo />
    </div>
  );
}
