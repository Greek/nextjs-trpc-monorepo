"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@repo/ui/button";
import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { env } from "@/env";

export default function LoginForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { app: api } = useTRPC();
  const response = useMutation<Record<string, unknown>>(
    api.helloWorld.getName.mutationOptions()
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setForm({ name: "", email: "", password: "" });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Example: send all fields, adjust as needed for your API
    response.mutate(form);
  };

  return (
    <div>
      <h1>Login ({env.NEXT_PUBLIC_DUMMY_VARIABLE})</h1>
      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={onChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={onChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
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

      {response.error && (
        <div>
          <h3>Error</h3>
          <p>{response.error.data?.validationError?.formErrors}</p>
        </div>
      )}

      {response.data && (
        <div>
          <h3>Response</h3>
          <p>{JSON.stringify(response.data)}</p>
        </div>
      )}
    </div>
  );
}
