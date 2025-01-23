"use server";

import { prisma } from "@/db/db";
import { signupSchema, signupSchemaType } from "@/zod/types";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";

export async function signupAction(values: signupSchemaType) {
  const parsedData = signupSchema.parse(values);
  if (
    !parsedData ||
    !parsedData.email ||
    !parsedData.password ||
    !parsedData.name
  ) {
    return {
      error: "Invalid data",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (existingUser) {
      return {
        error: "User already exists",
      };
    }

    const hasedPassword = await bcrypt.hash(parsedData.password, 10);

    await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: hasedPassword,
      },
    });
    redirect("/dashboard");
  } catch (error) {
    console.log("Error signing up", error);
  }
}

export async function updateInvoiceStatus(
  invoiceId: string,
  newStatus: Status
) {
  try {
    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath(`/dashboard/${invoiceId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update status" };
  }
}
