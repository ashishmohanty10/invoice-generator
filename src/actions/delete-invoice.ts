"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/db";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(invoiceId: string) {
  const session = await auth();
  if (!session) return { success: false };

  const userId = session.user?.id;
  if (!userId) return { success: false };

  try {
    await prisma.invoice.delete({
      where: {
        id: invoiceId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { success: false, error: "Failed to delete invoice" };
  }
}
