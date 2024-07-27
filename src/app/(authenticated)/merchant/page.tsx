import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getAllMerchants } from "./[id]/actions/merchant.action";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { MerchantPage } from "./components/MerchantPage";

export default async function Page({}: {}) {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { tags: string[] };
  } | null;

  const data = await getAllMerchants();

  if (!data.success || !data.data) {
    notFound();
  }

  const detail = data.data;

  return <MerchantPage detail={detail} user={session?.user!!} />;
}
