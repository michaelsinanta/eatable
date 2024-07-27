"use client";
import { DefaultUser } from "next-auth";
import Image from "next/image";
import {
  formatPrice,
  formatVoteCount,
  metersToKilometers,
  metersToMinutes,
} from "@/utils/utils";
import { useEffect, useState } from "react";
import haversine from "haversine-distance";
import { BsStars } from "react-icons/bs";
import MenuItemCard from "./MenuItemCard";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

interface MerchantDetailPageProps {
  detail: any;
  user: DefaultUser & { tags?: string[] };
  menu: any;
}

export function MerchantDetailPage(props: MerchantDetailPageProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          if (props.detail.latlng) {
            const distance = haversine(location, {
              latitude: props.detail.latlng.latitude,
              longitude: props.detail.latlng.longitude,
            });
            setDistance(distance);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to retrieve your location");
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  }, [props.detail.latlng]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white">
        <div className="relative w-full h-64 rounded-full flex items-center justify-center">
          <Image
            layout="fill"
            objectFit="cover"
            src={props.detail.merchantBrief?.photoHref ?? "/default-image.jpg"}
            alt="Eeta Logo"
          />
          <Link href={"/discovery"}>
            <button className="absolute top-5 left-5 w-10 h-10 bg-white text-white rounded-full flex items-center justify-center hover:bg-gray-100">
              <IoIosArrowBack className="fill-[#00AE4F]" size={30} />
            </button>
          </Link>
        </div>
        <div className="mt-6 flex flex-col items-start px-6">
          <h1 className="text-2xl font-bold">{props.detail.chainName}</h1>
          <div className="flex justify-between w-full">
            <p className="text-muted-foreground">
              {props.detail?.address?.name}
            </p>
            <a
              className="text-[#00AE4F] cursor-pointer"
              href={`https://www.google.com/maps?q=${props.detail?.latlng?.latitude},${props.detail?.latlng?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See on maps
            </a>
          </div>
          <div className="flex space-x-4 items-center text-sm">
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{props.detail.merchantBrief?.rating}</p>
              <p>{formatVoteCount(props.detail.merchantBrief?.vote_count)}</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {props.detail.merchantBrief?.cuisine.length}
              </p>
              <p>Menu Variants</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {formatPrice(props.detail?.estimatedDeliveryFee?.price)}
              </p>
              <p>Estimated Delivery Fee</p>
            </div>
            <div className="w-0.5 h-16 bg-slate-300 rounded-xl items-center"></div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">
                {props.detail.merchantBrief?.openHours?.displayedHours}
              </p>
              <p>Opening Hours</p>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col items-start px-6 bg-gray-100 p-3 border border-1 border-gray-200">
          <p className="font-bold">
            {metersToKilometers(distance)}Km distance from you!
          </p>
          <p>Delivery in {metersToMinutes(distance)} min</p>
        </div>

        <div className="flex w-full items-center justify-center mt-4">
          <div className="flex items-center justify-center w-fit px-8 p-3 bg-[#00AE4F] border border-1 border-[#58BC6B] text-white font-bold space-x-4 rounded-lg">
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <BsStars /> <p>What menus are safe for me?</p>
              </div>
              <div className="bg-white px-3 py-1 w-full justify-center items-center rounded-xl text-center cursor-pointer">
                <p className="text-[#00AE4F]">Ask Eeta!</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-white bg-[#00AE4F] p-3">
              <Image
                width={50}
                height={50}
                src="/images/chatbot.svg"
                alt="Eeta Logo"
                className="fill-[#00AE4F]"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 px-6 mb-12">
          <div className="grid grid-cols-1 gap-4">
            {props.menu?.merchant.menu.categories.map((category: any) => (
              <div key={category.ID}>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {category.items.map((item: any) => (
                    <MenuItemCard key={item.ID} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
