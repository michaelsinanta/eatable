"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import haversine from "haversine-distance";
import { metersToKilometers, metersToMinutes } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

export default function MerchantList({ detail }: { detail: any[] }) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [distances, setDistances] = useState<
    { distance: number; time: string }[]
  >([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && detail) {
      const calculatedDistances = detail.map((merchant) => {
        const merchantLocation = {
          latitude: merchant.latlng.latitude,
          longitude: merchant.latlng.longitude,
        };
        const distanceInMeters = haversine(userLocation, merchantLocation);
        const distanceInKilometers = parseFloat(
          metersToKilometers(distanceInMeters),
        );
        const roundedDistance = Math.round(distanceInKilometers);
        const estimatedTime = metersToMinutes(distanceInMeters);

        return {
          distance: roundedDistance,
          time: estimatedTime,
        };
      });
      setDistances(calculatedDistances);
    }
  }, [userLocation, detail]);

  const router = useRouter();

  const handleNext = (id: string) => {
    router.push(`/merchant/${id}`);
  };

  return (
    <div className="px-2">
      {detail.map((merchant, index) => (
        <div
          key={merchant.id}
          onClick={() => handleNext(merchant.id)}
          className="flex items-start mb-4 p-1 cursor-pointer hover:shadow-md hover:rounded-lg transition-shadow transition-transform duration-300 ease-in-out"
        >
          <div className="relative w-40 h-40 bg-gray-300 rounded-lg overflow-hidden mr-4">
            <Image
              src={merchant.merchantBrief.photoHref}
              alt="Restaurant"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-[#00AE4F] text-white text-xs font-semibold px-2 py-1 rounded-br-lg flex flex-row gap-1 items-center">
              <FaStar />
              <p className="my-auto">
                {merchant.merchantBrief.rating} (
                {merchant.merchantBrief.vote_count})
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{merchant.chainName}</h3>
            </div>
            <div className="text-sm flex flex-row gap-3 text-gray-500">
              <p>
                <span className="font-semibold">$</span>$$$
              </p>
              <p className="whitespace-nowrap">
                {distances[index] ? `${distances[index].distance} km` : "..."}
              </p>
              <p>
                {distances[index]
                  ? `Delivery in ${distances[index].time} min`
                  : "..."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 my-4">
              {merchant.tags.map((tag: any, tagIndex: any) => (
                <span
                  key={tagIndex}
                  className="bg-green-200 text-black text-xs py-1 px-2 rounded-full whitespace-nowrap text-center w-fit"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
