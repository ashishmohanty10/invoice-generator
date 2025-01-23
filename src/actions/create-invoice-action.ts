"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/db";
import { createInvoiceSchemaType } from "@/zod/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoiceAction(values: createInvoiceSchemaType) {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const userId = session.user?.id;
  if (!userId) {
    return { success: false, id: "" };
  }

  const value = Math.round(parseFloat(values.amount) * 100);
  try {
    const invoice = await prisma.invoice.create({
      data: {
        name: values.name,
        amount: parseInt(value.toString()),
        description: values.description || "",
        email: values.email,
        userId,
      },
    });
    revalidatePath("/dashboard");

    return { success: true, id: invoice.id };
  } catch (error) {
    console.log("something went wrong", error);
  }
}
