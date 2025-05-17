"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import "./globals.css"

export default function LoginForm() {
  const router = useRouter();
  const session = authClient.useSession();

  return (
    <>
      <div>
        <h1 className="text-sm">
          {session.data?.user
            ? `Hi ${session.data.user.name}!`
            : "Hello user! You are not signed in."}
        </h1>

        <div className="flex flex-col gap-y-4 w-2xs">
          <p>You can do the following:</p>

          {session.data?.user && (
            <>
              <button onClick={() => authClient.signOut()}>Sign out</button>
            </>
          )}
          {!session.data?.user && (
            <>
              <button onClick={() => router.push("/auth/login")}>Login</button>
              <button onClick={() => router.push("/auth/signup")}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
