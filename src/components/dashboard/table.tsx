import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { InvoiceResult } from "@/types/invoice";

interface InvoiceTableProps {
  invoices: InvoiceResult[];
}

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <Link href={`/dashboard/${item.id}`}>
                {item.createdAt.toLocaleDateString("en-US")}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/${item.id}`}>{item.name}</Link>
            </TableCell>
            <TableCell>
              <Link href={`/dashboard/${item.id}`}>{item.email}</Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/dashboard/${item.id}`}
                className="flex items-center w-full"
              >
                <Badge
                  className={cn(
                    "status-badge",
                    item.status === "OPEN" && "status-badge-open",
                    item.status === "CANCELLED" && "status-badge-cancelled",
                    item.status === "PAID" && "status-badge-paid",
                    item.status === "PENDING" && "status-badge-pending"
                  )}
                >
                  {item.status}
                </Badge>
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/dashboard/${item.id}`}>${item.amount / 100}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
