"use client";

import { EllipsisVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useTransition } from "react";
import { deleteInvoice } from "@/actions/delete-invoice";
import { toast } from "sonner";
import { InvoiceResult } from "@/types/invoice";
import { useRouter } from "next/navigation";

interface DeleteInvoiceProps {
  invoice: InvoiceResult;
}

export function DeleteInvoice({ invoice }: DeleteInvoiceProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!invoice.id) return;

    startTransition(async () => {
      const response = await deleteInvoice(invoice.id);
      if (response?.success) {
        router.push("/dashboard");
        toast.success("Invoice deleted successfully");
      } else {
        toast.error("Failed to delete invoice");
      }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Invoice
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                invoice and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                {isPending ? "Deleting..." : "Delete Invoice"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
