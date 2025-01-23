"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { createInvoiceSchema, createInvoiceSchemaType } from "@/zod/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createInvoiceAction } from "@/actions/create-invoice-action";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateInvoiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<createInvoiceSchemaType>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      name: "",
      amount: "",
      email: "",
      description: "",
    },
  });

  async function onSubmit(values: createInvoiceSchemaType) {
    try {
      setLoading(true);
      const res = await createInvoiceAction(values);

      if (!res?.success) {
        toast.error("Something went wrong");
      } else {
        router.push("/dashboard");
        toast.success("Invoice created successfully");
        form.reset();
      }
    } catch (error) {
      console.log("error while sending data", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card className="max-w-7xl min-w-[600px] shadow-md">
        <CardHeader>
          <h1 className="text-md font-semibold">Create Invoice</h1>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="billing name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="billing email"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="billing amount"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="billing description" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Invoice"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
