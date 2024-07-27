"use client";
import { signIn } from "next-auth/react";

export default function ButtonLogin() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/onboarding",
        })
      }
      className="bg-white text-green-600 font-semibold py-3 px-20 rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
    >
      Login with Google
    </button>
  );
}
