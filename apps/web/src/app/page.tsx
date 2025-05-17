"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const session = authClient.useSession();

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
            </>
          )}
          {!session.data?.user && (
            <>
              <Button onClick={() => router.push("/auth/login")}>Login</Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
