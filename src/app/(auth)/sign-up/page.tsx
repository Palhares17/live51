"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const schema = z.object({
  firstName: z.string().min(2, "Insira seu primeiro nome"),
  lastName: z.string().min(2, "Insira seu último nome"),
  email: z.string().email("Insira seu email corretamente"),
  password: z.string().min(5, "Insira a senha"),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsLoading(true);
      await axios.post("/api/auth/sign-up", formData);

      router.push("/sign-in");

      toast("Conta criada com sucesso, faça login", {
        description: "Agora você pode fazer login",
      });
    } catch {
      toast.error("Erro ao criar conta, tente novamente");
      setIsLoading(false);
    }
  });

  return (
    <Card className="mx-auto max-w-screen-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primeiro Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adicione seu nome"
                        {...field}
                        autoComplete="firstname"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ultimo Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adicionae seu ultimo nome"
                        {...field}
                        autoComplete="lastname"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adicione seu email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@exemplo.com"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {!isLoading && "Create an account"}
              {isLoading && "Criando conta..."}
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Sign up with GitHub
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
