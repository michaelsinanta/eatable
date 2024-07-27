/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Head from "next/head";
import { IoIosArrowBack } from "react-icons/io";
import { FaSlidersH } from "react-icons/fa";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="min-h-screen p-4">
      <Head>
        <title>Eatable</title>
        <meta name="description" content="Safe dining for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchForm />
      <ToggleSwitch />
      <RestaurantList />
      {chatOpen && <Chat toggleChat={toggleChat} />}
    </div>
  );
}

const SearchForm = () => (
  <div className="flex flex-row gap-4 justify-center items-center mb-4">
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

const Chat = ({ toggleChat }: any) => (
  <>
    <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white p-4 rounded-t-2xl shadow-lg z-20 md:max-w-md md:mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold">Eeta Bot</span>
        <button className="text-[#00AE4F]" onClick={toggleChat}>
          Close
        </button>
      </div>
      <div className="space-y-16">
        <ChatMessage
          avatar={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 1.104-.895 2-2 2s-2-.896-2-2m4-1h6M4 11v2m2-2a2 2 0 11-2 2m0 0a2 2 0 012 2m4-2v6m-4 2h6a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          message="Hi, Alex. What do you feel like eating today?"
        />
        <ChatMessage message="Ask me a series of questions." button />
        <ChatMessage
          avatar={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 1.104-.895 2-2 2s-2-.896-2-2m4-1h6M4 11v2m2-2a2 2 0 11-2 2m0 0a2 2 0 012 2m4-2v6m-4 2h6a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          message="Okay! Hot, warm, or cold?"
        />
      </div>
      <ChatInput />
    </div>
  </>
);

const ChatMessage = ({ avatar, message, button }: any) => (
  <div className="flex space-x-4 items-start">
    {avatar && (
      <div className="w-10 h-10 bg-[#00AE4F] rounded-full flex items-center justify-center">
        {avatar}
      </div>
    )}
    <div
      className={`bg-green-100 p-4 rounded-lg flex-1 ${
        button ? "cursor-pointer bg-[#00AE4F] text-white" : ""
      }`}
    >
      <p>{message}</p>
    </div>
  </div>
);

const ChatInput = () => (
  <div className="flex mt-4">
    <input
      type="text"
      placeholder="Write your answer..."
      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
    />
    <button className="px-4 py-2 bg-[#00AE4F] text-white rounded-r-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 12h8m0 0l-4 4m4-4l-4-4m-8 8V8"
        />
      </svg>
    </button>
  </div>
);
