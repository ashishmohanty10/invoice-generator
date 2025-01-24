import { InvoiceTable } from "@/components/dashboard/table";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/db/db";
import { PaginationComponent } from "@/components/dashboard/pagination";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/signin");
  }

  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const totalInvoices = await prisma.invoice.count();
  const totalPages = Math.ceil(totalInvoices / pageSize);

  const invoices = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold">Invoices</h1>
      <div className="flex justify-end w-full mb-10">
        <Button asChild>
          <Link href="/dashboard/new" className="flex items-center gap-x-2">
            <BadgePlus />
            Create Invoice
          </Link>
        </Button>
      </div>
      <InvoiceTable invoices={invoices} />
      <div className="mt-5">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
