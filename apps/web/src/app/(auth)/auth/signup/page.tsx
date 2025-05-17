"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { ErrorContext, SuccessContext } from "better-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpResponse, setSignUpResponse] = useState<SuccessContext>();
  const [signUpError, setSignUpError] = useState<ErrorContext>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setForm({ name: "", email: "", password: "" });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authClient.signUp.email(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        // callbackURL: "/"
      },
      {
        onSuccess(ctx): void {
          setSignUpError(undefined);
          setSignUpResponse(ctx);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        },
        onError(ctx): void {
          setSignUpError(ctx);
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center text-center prose-xl min-h-screen">
      <h3>Signup</h3>
      <form onSubmit={submit} className="flex flex-col gap-y-4 w-2xs">
        <Label htmlFor="email">Name</Label>
        <Input
          type="name"
          name="name"
          id="name"
          value={form.name}
          onChange={onChange}
          required
        />

        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={onChange}
          required
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={onChange}
          required
        />

        <Button type="submit">Login</Button>
        <Button type="button" onClick={onReset}>
          Reset
        </Button>
      </form>

      {signUpError?.error && (
        <div>
          <h3>Error</h3>
          <p>{signUpError.error.message}</p>
        </div>
      )}

      {signUpResponse?.data && (
        <div>
          <h3>Response</h3>
          <p>{JSON.stringify(signUpResponse.data)}</p>
        </div>
      )}
    </div>
  );
}
