import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { tags: string[] };
  } | null;

  const data = await getMerchant(params.id);

  if (!data.success || !data.data?.destination?.data) {
    notFound();
  }

  const detail = data.data.destination.data;

  return (
   
  );
}
