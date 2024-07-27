import { FaMagic, FaComment } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import Image from "next/image";
import React from "react";

const IntroducingEeta = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 py-16 rounded-b-3xl flex items-center justify-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <Image
              width={400}
              height={400}
              src="/images/chatbot.svg"
              alt="Eeta Logo"
              className="w-52 h-52"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center px-12">
          <div className="bg-gray-200 flex flex-row gap-2 items-center text-gray-700 font-semibold my-3 text-md px-4 py-2 rounded-full mb-6">
            <BsStars />
            <p>New</p>
          </div>
          <h1 className="text-2xl font-bold mb-2 tracking-wide">
            Introducing Eeta
          </h1>
          <p className="text-gray-600 text-center mb-6">
            With Eeta, your food hypersensitivity is no longer a barrier in
            ordering food.
          </p>
          <div className="w-full bg-gray-100 p-6 rounded-lg mb-6 mt-3">
            <div className="flex items-center mb-3">
              <FaComment size={33} />
              <p className="ml-4 mb-3">
                Chat with Eeta in an engaging conversation
              </p>
            </div>
            <div className="flex items-center">
              <FaMagic size={33} />
              <p className="ml-4">
                Receive recommendations for your specific dietary restrictions
              </p>
            </div>
          </div>
          <div className="w-full bg-white flex-shrink-0 h-12 mt-4">
            <button className="w-full justify-center rounded-lg bg-[#00AE4F] px-5 py-3 text-center text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroducingEeta;
