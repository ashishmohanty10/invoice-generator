"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { loginSchema, loginSchemaType } from "@/zod/types";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginSchemaType) {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid credentials");
        return;
      }
      router.push("/dashboard");
      toast.success("Signin successfully");
      form.reset({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Card className="max-w-md min-w-[400px]">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Signin</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-2 rounded-md border border-input bg-transparent px-3 text-base shadow-sm">
                        <Input
                          placeholder="password..."
                          {...field}
                          className="border-none px-0 outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0"
                          type={showPassword ? "text" : "password"}
                        />
                        <div onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Eye /> : <EyeClosed />}
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Signin"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
