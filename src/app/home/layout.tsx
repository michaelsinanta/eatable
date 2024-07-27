"use client";

import { ChatContextProvider } from "@/context/ChatContext"
import { Session } from "inspector"
import { SessionProvider } from "next-auth/react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SessionProvider>
        <ChatContextProvider>
          {children}
        </ChatContextProvider>
      </SessionProvider>
    </>
  )
}
