"use server";

import { prisma } from "@/db/db";
import { signupSchema, signupSchemaType } from "@/zod/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";
import { auth } from "@/auth";
import { sendInvoiceEmail } from "@/lib/send-invoice-email";

export async function signupAction(values: signupSchemaType) {
  const parsedData = signupSchema.safeParse(values);
  if (!parsedData.success) {
    return {
      error: "Invalid data",
    };
  }

  const { email, password, name } = parsedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        error: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log("Error signing up", error);
  }
}

export async function updateInvoiceStatus(
  invoiceId: string,
  newStatus: Status
) {
  const session = await auth();
  if (!session) return;

  const userid = session.user?.id;
  if (!userid) return;

  try {
    const updatedInvoice = await prisma.invoice.update({
      where: {
        id: invoiceId,
        userId: userid,
      },
      data: {
        status: newStatus,
      },
    });

    if (newStatus === "PAID") {
      await sendInvoiceEmail(updatedInvoice);
    }

    revalidatePath(`/dashboard/${invoiceId}`);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update status" };
  }
}
