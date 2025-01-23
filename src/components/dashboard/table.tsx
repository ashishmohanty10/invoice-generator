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

export function TableDemo() {
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
        <TableRow>
          <TableCell className="font-medium">23/01/2025</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>johndoe@example.com</TableCell>
          <TableCell>
            <Badge>Paid</Badge>
          </TableCell>

          <TableCell className="text-right">$1,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
