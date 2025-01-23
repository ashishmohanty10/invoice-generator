"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Status } from "@prisma/client";
import { useTransition } from "react";
import { updateInvoiceStatus } from "@/actions/action";
import { toast } from "sonner";

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
} from "@/components/ui/alert-dialog";

const availableStatus: Array<{
  id: number;
  label: string;
  value: Status;
}> = [
  {
    id: 1,
    label: "Paid",
    value: "PAID",
  },
  {
    id: 2,
    label: "Open",
    value: "OPEN",
  },
  {
    id: 3,
    label: "Cancelled",
    value: "CANCELLED",
  },
  {
    id: 4,
    label: "Pending",
    value: "PENDING",
  },
];

interface ChangeStatusProps {
  result: {
    name: string;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    amount: number;
    description: string;
    status: Status;
  } | null;
}

export function ChangeStatus({ result }: ChangeStatusProps) {
  const [isPending, startTransition] = useTransition();

  async function handleStatusChange(newStatus: Status) {
    if (!result?.id) return;

    startTransition(async () => {
      const response = await updateInvoiceStatus(result.id, newStatus);

      if (response.success) {
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending}>
          {isPending ? "Updating..." : "Change Status"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {availableStatus.map((item) => (
          <AlertDialog key={item.id}>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="cursor-pointer"
            >
              <AlertDialogTrigger className="w-full">
                <span className="w-full text-left">{item.label}</span>
              </AlertDialogTrigger>
            </DropdownMenuItem>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change the invoice status to{" "}
                  {item.label}? This action can be reversed by changing the
                  status again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleStatusChange(item.value)}
                  disabled={isPending}
                >
                  {isPending ? "Confirming..." : "Confirm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
