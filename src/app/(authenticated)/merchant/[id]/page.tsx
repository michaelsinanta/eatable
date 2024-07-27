import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import { getMerchant } from "./actions/merchant.action";

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

  if (!data.success || !data.data) {
    notFound();
  }

  const detail = data.data;

  return (
    <div>
      <h1>{detail.chainName}</h1>
      <p>{detail.merchantBrief?.description}</p>
    </div>
  );
}
