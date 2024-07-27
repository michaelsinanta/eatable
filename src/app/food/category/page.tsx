/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Head from "next/head";
import { IoIosArrowBack } from "react-icons/io";
import { FaSlidersH } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <Head>
        <title>Eatable</title>
        <meta name="description" content="Safe dining for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchForm />
      <CategoryCarousel />
      <ToggleSwitch />
      <RestaurantList />
    </div>
  );
}

const SearchForm = () => (
  <div className="flex flex-row gap-4 justify-center items-center mb-4">
    <IoIosArrowBack size={40} />
    <form className="flex flex-row w-full items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5"
          placeholder="Find a specific restaurant..."
          required
        />
      </div>
    </form>
    <FaSlidersH size={27} color="black" />
  </div>
);

const ToggleSwitch = () => (
  <div className="flex justify-between items-center my-10 px-4">
    <span>Only show restaurants safe for me</span>
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[#00AE4F] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00AE4F]"></div>
    </label>
  </div>
);

const CategoryCarousel = () => (
  <div className="flex space-x-4 overflow-x-auto mb-4 mt-8 px-4">
    {Array(6)
      .fill("Chicken")
      .map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
          <span className="mt-2 text-sm">{item}</span>
        </div>
      ))}
  </div>
);

const RestaurantList = () => (
  <div className="px-4">
    {Array(5)
      .fill("Warung Aman")
      .map((item, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="relative w-32 h-32 bg-gray-300 rounded-lg overflow-hidden mr-4">
            <img
              src="https://img-cdn.medkomtek.com/cbSK7dUg1G3bpY3yZGHg0HR887I=/510x395/smart/filters:quality(100):format(webp)/article/ety2TliWToJL9aRu_J8er/original/24mlji190zvfxtjabasz48zea17jmuin.jpg"
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-[#00AE4F] text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
              4.6 (456)
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
            <div className="text-sm flex flex-row gap-3 text-gray-500">
              <p>
                <span className="font-semibold">$</span>$$$
              </p>
              <p>4.6 km</p>
              <p>Delivery in 30 min</p>
            </div>
            <div className="flex space-x-2 my-4">
              <span className="bg-green-200 text-black text-xs py-1 px-2 rounded-full">
                Gluten-Free
              </span>
              <span className="bg-green-200 text-black text-xs py-1 px-2 rounded-full">
                Vegan
              </span>
            </div>
            <span className="text-sm text-gray-500 mt-2 block">
              View 3 more
            </span>
          </div>
        </div>
      ))}
  </div>
);
