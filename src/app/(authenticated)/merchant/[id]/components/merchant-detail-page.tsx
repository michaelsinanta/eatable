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
import { useRouter } from "next/navigation";
import sendToCohere, { sendToCohereMerchant } from "@/app/home/actions/rag";
import { tags } from "../../../../../constant/tags";
import { Spinner } from "flowbite-react";
interface MerchantDetailPageProps {
  detail: any;
  user: DefaultUser & { tags?: string[] };
  menu: any;
}

export function MerchantDetailPage(props: MerchantDetailPageProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [magicMsg, setMagicMsg] = useState<string>("");

  function askEeta(e: any) {
    e.preventDefault();
    const menu = props.menu.merchant.menu;
    const newMenu = Object.values(menu.categories).flatMap(
      (category) => (category as any).items,
    );
    console.log("menuu", newMenu);
    console.log("tags", props.user.tags);
    setLoading(true);
    const resp = sendToCohereMerchant(
      props.detail.chainName,
      props.user.tags!,
      newMenu.slice(0, Math.min(newMenu.length, 25)).map((item) => ({
        available: String(item.available) ?? "Not Available",
        description: item.description ?? "",
        name: item.name ?? "",
      })),
    );
    resp
      .then((res) => {
        setLoading(false);
        // alert("success");
        console.log(res);
        setMagicMsg(res.text);
      })
      .catch((err) => {
        setLoading(false);
        console.log("awooga err", err);
      });
  }

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

          <button
            onClick={() => router.back()}
            className="absolute top-5 left-5 w-10 h-10 bg-white text-white rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <IoIosArrowBack className="fill-[#00AE4F]" size={30} />
          </button>
        </div>
        <div className="mt-6 flex flex-col items-start px-6">
          <h1 className="text-2xl font-bold">{props.detail.chainName}</h1>
          <div className="flex justify-between w-full text-sm">
            <p className="text-muted-foreground">
              {props.detail?.address?.name}
            </p>
            <Link
              className="text-[#00AE4F] cursor-pointer"
              href={`https://www.google.com/maps?q=${props.detail?.latlng?.latitude},${props.detail?.latlng?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              See on maps
            </Link>
          </div>
          <div className="flex items-center text-sm mt-4">
            <div className="flex flex-col space-y-1">
              <p className="font-bold">{props.detail.merchantBrief?.rating}</p>
              <p>{formatVoteCount(props.detail.merchantBrief?.vote_count)}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-bold">
                {props.detail.merchantBrief?.cuisine.length}
              </p>
              <p>Menu Variants</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-bold">
                {formatPrice(props.detail?.estimatedDeliveryFee?.price)}
              </p>
              <p>Estimated Delivery Fee</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-bold">
                {props.detail.merchantBrief?.openHours?.displayedHours}
              </p>
              <p>Opening Hours</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start my-4 pl-6 bg-gray-100 py-3 border border-1 border-gray-200 text-sm">
          <p className="font-semibold">
            {metersToKilometers(distance)} km distance from you!
          </p>
          <p>Delivery in {metersToMinutes(distance)} minutes</p>
        </div>

        <div className="flex items-center justify-center mt-4 mx-auto w-[94%] text-sm">
          <div className="flex items-center justify-center w-fit px-8 py-4 bg-[#00AE4F] border border-1 border-[#58BC6B] text-white font-bold space-x-4 rounded-lg">
            <div className="flex flex-col gap-y-2 w-fit">
              <div className="flex font-semibold items-center gap-1">
                <BsStars /> <p>What menus are safe for me?</p>
              </div>
              {magicMsg ? (
                <p className="font-light w-fit overflow-y-scroll no-scrollbar max-h-24">
                  {magicMsg}
                </p>
              ) : loading ? (
                <Spinner className="mx-auto w-full items-center justify-center" />
              ) : (
                <button
                  className="bg-white px-3 py-1 w-full justify-center items-center rounded-full text-center cursor-pointer"
                  onClick={askEeta}
                >
                  <p className="text-[#00AE4F] font-semibold">Ask Eeta!</p>
                </button>
              )}
            </div>
            <div className="w-28 h-28 rounded-full flex items-start justify-center mb-auto border-white">
              <Image
                width={50}
                height={50}
                src="/images/chatbot.svg"
                alt="Eeta Logo"
                className="fill-[#00AE4F] px-2 py-1 border-white rounded-lg w-full h-full"
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
                  {category.items?.map((item: any) => (
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
