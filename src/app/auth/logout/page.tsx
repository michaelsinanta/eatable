"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <>
      <p>you have been signed out</p>
    </>
  );
}
