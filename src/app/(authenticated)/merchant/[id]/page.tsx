import React, { useEffect, useState } from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import { getMerchant } from "./actions/merchant.action";
import { MerchantDetailPage } from "./components/merchant-detail-page";

async function getMenu(data: any) {
  const res = await fetch(
    `https://portal.grab.com/foodweb/v2/merchants/${data.id}?latlng=${data.detail?.latlng?.latitude},${data.detail?.latlng?.longitude}`,
  );

  if (!res.ok) {
    return { data: [] };
  }
  return res.json();
}

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
  const menu = await getMenu(detail);

  return (
    <MerchantDetailPage detail={detail} user={session?.user!!} menu={menu} />
  );
}
