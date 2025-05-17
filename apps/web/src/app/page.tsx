"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const session = authClient.useSession();

  return (
    <>
      <div>
        <h1>
          {session.data?.user
            ? `Hi ${session.data.user.name}!`
            : "Hello user! You are not signed in."}
        </h1>

        <div style={{display: "flex", flexDirection: "column", width: "12rem", rowGap: "0.5rem"}}>
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
