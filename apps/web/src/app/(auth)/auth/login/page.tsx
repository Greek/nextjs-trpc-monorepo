"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { ErrorContext, SuccessContext } from "better-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loginResponse, setLoginResponse] = useState<SuccessContext>();
  const [loginError, setLoginError] = useState<ErrorContext>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setForm({ email: "", password: "" });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authClient.signIn.email(
      {
        email: form.email,
        password: form.password,
        // callbackURL: "/"
      },
      {
        onSuccess(ctx): void {
          setLoginError(undefined);
          setLoginResponse(ctx);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        },
        onError(ctx): void {
          setLoginError(ctx);
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center text-center prose-xl min-h-screen">
      <h3>Login</h3>
      <form onSubmit={submit} className="flex flex-col gap-y-4 w-2xs">
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

      {loginError?.error && (
        <div>
          <h3>Error</h3>
          <p>{loginError.error.message}</p>
        </div>
      )}

      {loginResponse?.data && (
        <div>
          <h3>Response</h3>
          <p>{JSON.stringify(loginResponse.data)}</p>
        </div>
      )}
    </div>
  );
}
