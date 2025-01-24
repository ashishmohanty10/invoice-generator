import { Status } from "@prisma/client";

export interface InvoiceResult {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  amount: number;
  description: string;
  status: Status;
}
