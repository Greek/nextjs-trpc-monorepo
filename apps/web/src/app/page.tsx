"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@repo/ui/button";
import { useTRPC } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { env } from "@/env";

export default function Web() {
  const [name, setName] = useState<string>("");

  const { app: api } = useTRPC();
  const response = useMutation<Record<string, unknown>>(
    api.helloWorld.getName.mutationOptions()
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onReset = () => {
    setName("");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    response.mutate(name);
  };

  return (
    <div>
      <h1>Web ({env.NEXT_PUBLIC_DUMMY_VARIABLE})</h1>
      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
        ></input>
        <Button type="submit">Submit</Button>
      </form>
      {name}

      {response.error && (
        <div>
          <h3>Error</h3>
          <p>{response.error.data?.validationError?.formErrors}</p>
        </div>
      )}

      {response.data && (
        <div>
          <h3>Greeting</h3>
          <p>{response.data}</p>
        </div>
      )}
    </div>
  );
}
