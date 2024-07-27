import React from "react";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { notFound } from "next/navigation";
import { getMerchant } from "./actions/merchant.action";
import Image from "next/image";
import { formatPrice, formatVoteCount } from "@/utils/utils";

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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white">
        <div className="relative w-full h-64 rounded-full flex items-center justify-center">
          <Image
            layout="fill"
            objectFit="cover"
            src={detail.merchantBrief?.photoHref ?? "/default-image.jpg"}
            alt="Eeta Logo"
          />
        </div>
        <div className="mt-6 flex flex-col items-start px-6">
          <h1 className="text-2xl font-bold">{detail.chainName}</h1>
          <div className="flex justify-between w-full">
            <p className="text-muted-foreground">{detail?.address?.name}</p>
            <a
              className="text-[#00AE4F] cursor-pointer"
              href={`https://www.google.com/maps?q=${detail?.latlng?.latitude},${detail?.latlng?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See on maps
            </a>
          </div>
          <div className="flex space-x-4 items-center text-sm">
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{detail.merchantBrief?.rating}</p>
              <p>{formatVoteCount(detail.merchantBrief?.vote_count)}</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {detail.merchantBrief?.cuisine.length}
              </p>
              <p>Menu Variants</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {formatPrice(detail?.estimatedDeliveryFee?.price)}
              </p>
              <p>Estimated Delivery Fee</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {detail.merchantBrief?.openHours?.displayedHours}
              </p>
              <p>Opening Hours</p>
            </div>
          </div>

          <div className="w-full bg-white flex-shrink-0 h-16 mt-4">
            <button className="w-full justify-center rounded-lg bg-[#00AE4F] px-5 py-3 text-center text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
