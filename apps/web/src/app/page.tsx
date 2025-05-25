"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const session = authClient.useSession();

  const { app } = useTRPC();
  const getNameMutation = useMutation(app.helloWorld.getName.mutationOptions());
  const protected_getNameMutation = useMutation(app.helloWorld.protected_getName.mutationOptions());

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center prose-xl min-h-screen">
        <h2>
          {session.data?.user
            ? `Hi ${session.data.user.name}!`
            : "Hello user! You are not signed in."}
        </h2>

        <div className="flex flex-col gap-y-2 w-2xs">
          <p>You can do the following:</p>

          {session.data?.user && (
            <>
              <Button onClick={() => authClient.signOut()}>Sign out</Button>
              <Button onClick={() => getNameMutation.mutate("world")}>Get hello</Button>
              <Button onClick={() => protected_getNameMutation.mutate("world")}>(Protected) Get hello</Button>
            </>
          )}
          {!session.data?.user && (
            <>
              <Button onClick={() => router.push("/auth/login")}>Login</Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Sign up
              </Button>
              <Button onClick={() => getNameMutation.mutate("world")}>Get hello</Button>
              <Button onClick={() => protected_getNameMutation.mutate("world")}>(Protected) Get hello</Button>
            </>
          )}
          {getNameMutation.data as string && <p>{getNameMutation.data as string}</p>}
        </div>
      </div>
    </>
  );
}
