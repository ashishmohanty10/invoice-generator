import { Resend } from "resend";
import { InvoiceResult } from "@/types/invoice";
import { InvoiceEmail } from "@/email/templates/invoice-created";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function sendInvoiceEmail(invoice: InvoiceResult) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return;
  }

  try {
    const data = await resend.emails.send({
      from: "invoice@ashishdev.in",
      to: invoice.email,
      subject: `New Invoice #${invoice.id} for $${(invoice.amount / 100).toFixed(2)}`,
      react: InvoiceEmail({
        invoice,
        paymentLink: `${baseUrl}/dashboard/${invoice.id}`,
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    return { success: false, error };
  }
}
