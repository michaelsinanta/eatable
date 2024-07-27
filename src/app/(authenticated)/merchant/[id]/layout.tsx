import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-hidden relative h-full flex flex-col min-h-screen bg-white">
      <div className="flex flex-col items-start justify-start">
        {/* <Link
          href={"/discovery"}
          className="text-gray-800 text-xl font-semibold text-left w-full"
        >
          <HiArrowLeft className="inline mr-4" />
          Destination
        </Link> */}
      </div>
      <div className="overflow-y-auto hide-scrollbar">{children}</div>
    </div>
  );
}
