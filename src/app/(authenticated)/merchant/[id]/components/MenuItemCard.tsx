import React from "react";
import Image from "next/image";

interface MenuItemProps {
  item: {
    ID: string;
    name: string;
    priceInMinorUnit: number;
    imgHref: string;
    description: string;
  };
}

const MenuItemCard: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="border rounded-lg flex flex-col items-center border-1">
      <div className="relative w-full h-40">
        <Image
          src={item.imgHref}
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-md"
        />
      </div>
      <div className="items-start w-full p-3">
        <h2 className="text-md font-medium">{item.name}</h2>
        <p className="text-sm font-medium">
          Rp{(item.priceInMinorUnit / 100).toLocaleString()}
        </p>
      </div>
      <div className="mx-2 w-full mb-4 cursor-pointer">
        <div className="rounded-full border border-2 border-[#00AE4F] mx-2 text-[#00AE4F] items-center p-2 text-center font-semibold">
          Add
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
