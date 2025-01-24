import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { InvoiceResult } from "@/types/invoice";

interface InvoiceEmailProps {
  invoice: InvoiceResult;
  paymentLink: string;
}

export const InvoiceEmail = ({ invoice, paymentLink }: InvoiceEmailProps) => {
  const previewText = `New Invoice #${invoice.id} for $${(invoice.amount / 100).toFixed(2)}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] text-center p-0 my-[30px] font-bold mx-0">
              New Invoice Generated
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {invoice.name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              A new invoice has been generated for you.
            </Text>

            <Section className="my-[32px] bg-gray-50 rounded p-[20px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Invoice ID:</strong> {invoice.id}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Amount:</strong> ${(invoice.amount / 100).toFixed(2)}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Description:</strong> {invoice.description}
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={paymentLink}
              >
                View & Pay Invoice
              </Button>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invoice was sent to {invoice.email}. If you have any
              questions, please contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvoiceEmail;
