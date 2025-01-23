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
import { prisma } from "@/db/db";
import Link from "next/link";

export async function TableDemo() {
  const data = await prisma.invoice.findMany({});

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
        {data.map((item) => (
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
              <Link href={`/dashboard/${item.id}`}>
                <Badge>{item.status}</Badge>
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
