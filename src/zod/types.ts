import z from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createInvoiceSchema = z.object({
  name: z.string(),
  amount: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "Amount must be a positive number",
    }),
  email: z.string().email(),
  description: z.string(),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
export type createInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;
