import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getAllMerchants } from "../(authenticated)/merchant/[id]/actions/merchant.action";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Homepage from "./homepage";

export default async function Page({}: {}) {
  //   const session = (await getServerSession(authOptions)) as {
  //     user?: DefaultUser & { tags: string[] };
  //   } | null;

  const data = await getAllMerchants();

  if (!data.success || !data.data) {
    notFound();
  }

  const detail = data.data;

  return <Homepage detail={detail} />;
}
