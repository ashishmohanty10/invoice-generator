"use server";

import { prisma } from "@/db/db";
import { signupSchema, signupSchemaType } from "@/zod/types";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupAction(values: signupSchemaType) {
  console.log(values);
  const parsedData = signupSchema.parse(values);
  console.log(parsedData);
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

  console.log("Data is valid");
  try {
    console.log("inside try");
    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      return {
        error: "User already exists",
      };
    }

    const hasedPassword = await bcrypt.hash(parsedData.password, 10);

    console.log(hasedPassword);
    await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: hasedPassword,
      },
    });

    console.log("User created successfully");

    redirect("/dashboard");
  } catch (error) {
    console.log("Error signing up", error);
  }
}
