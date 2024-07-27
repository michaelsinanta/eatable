"use client";
import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import sendToCohere from "./actions/rag";
import { useChatContext } from "@/context/ChatContext";
import { SessionContextValue, useSession } from "next-auth/react";
import { Merchant } from "@prisma/client";
import { DefaultUser, Session } from "next-auth";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const { chatHistory, setChatHistory } = useChatContext() || {}
  const session = useSession()

  const toggleChat = () => {
    if (!chatOpen && (!chatHistory || chatHistory?.length === 0)) {
      console.log("session:", session);
      if (session.status !== "authenticated") {
        console.log("user not ready yet");
        return;
      }
      setChatHistory && setChatHistory((prev) => {
        if (!prev) {
          return [{
            data: null,
            message: `Hi, ${session.data?.user?.name || "NONE"}! What do you want to eat today?`,
            source: "bot",
          },]
        }
        return [{
          data: null,
          message: `Hi, ${session.data?.user?.name || "NONE"}! What do you want to eat today?`,
          source: "bot",
        }, ...prev]
      })
    }
    setChatOpen(!chatOpen);
  };

  return (
    <div className="min-h-screen h-1/2 pr-0 pb-4">
      <Head>
        <title>Eatable</title>
        <meta name="description" content="Safe dining for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <MainContent toggleChat={toggleChat} />
      {chatOpen && <Chat toggleChat={toggleChat} chatHistory={chatHistory} />}
    </div>
  );
}

const Header = () => (
  <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-4 pb-16">
    <div className="text-white mb-4">
      <h2 className="text-sm">DELIVER TO</h2>
      <h1 className="text-lg font-bold">Jalan Lokasi No.1</h1>
    </div>
    <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 px-14">
      <form className="flex flex-row w-full items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
            className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for people, topics, or keywords"
            required
          />
        </div>
      </form>
    </div>
  </div>
);

const ChatBubble = () => {
  return (
    <div className="flex items-center p-4 mt-10">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src="/images/green-chatbot.svg"
            alt="Eeta Logo"
            className="w-12 h-12 p-1"
          />
        </div>
      </div>
      <div className="ml-3 w-2/3">
        <div className="bg-white border border-green-500 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          Hi John! What do you want to eat today?
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ toggleChat }: any) => (
  <div className="bg-white">
    <div className="w-full flex justify-between items-center">
      <ChatBubble />
    </div>

    <div className="w-full bg-white flex-shrink-0 h-12 mt-4 px-5 mb-7">
      <button
        onClick={toggleChat}
        className="w-full justify-center rounded-lg bg-[#00AE4F] px-5 py-3 text-center text-md font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
      >
        Talk to Eeta!
      </button>
    </div>

    <FoodOptions />
    <Recommendations />
  </div>
);

const FoodOptions = () => (
  <div className="flex space-x-4 overflow-x-auto no-scrollbar mb-4 pb-4">
    {Array(6)
      .fill("Chicken")
      .map((item, index) => (
        <div key={index} className="flex ml-5 flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          <span className="mt-2 text-sm">{item}</span>
        </div>
      ))}
  </div>
);

const Recommendations = () => (
  <>
    <h2 className="text-2xl font-semibold mb-4 ml-5">Recommended For You</h2>
    <div className="flex space-x-4 overflow-x-auto no-scrollbar">
      {Array(3)
        .fill("Warung Aman")
        .map((item, index) => (
          <div key={index} className="w-40 ml-5 rounded-lg flex-shrink-0 pb-4">
            <div className="w-full h-32 bg-gray-300 rounded-xl mb-4"></div>
            <h3 className="text-md font-semibold">{item}</h3>
            <div className="flex space-x-2 mt-2">
              <span className="bg-green-200 text-black text-xs py-1 px-2 rounded-full">
                Gluten-Free
              </span>
              <span className="bg-green-200 text-black text-xs py-1 px-2 rounded-full">
                Vegan
              </span>
            </div>
            <span className="text-sm ml-1 text-gray-500 mt-2 block">
              View 3 more
            </span>
          </div>
        ))}
    </div>
  </>
);

type ChatType = {
  toggleChat: any
  chatHistory?: any[]
}

const Chat = ({ toggleChat, chatHistory }: ChatType) => (
  <>
    <div className="fixed inset-0 bg-black opacity-75 z-10"></div>
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white p-4 rounded-t-2xl shadow-lg z-20 md:max-w-md md:mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold">Eeta Bot</span>
        <button className="text-[#00AE4F]" onClick={toggleChat}>
          Close
        </button>
      </div>
      <div className="gap-y-4 overflow-y-scroll h-fit max-h-[70dvh] flex flex-col-reverse px-4">
        { chatHistory ? chatHistory.map((item, idx) => (
          !item.data ?
          <ChatMessage
            key={idx}
            avatar={
              item.source === "bot" && <svg
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
            message={item.message}
            className={item.source === "bot" ? 
              "text-start"
              : 
              "text-end"
            }
          /> :
          <div key={idx} className="flex flex-col gap-2">
            {item.data.map((dest: Merchant, i: number) => (
              <div key={i} className="p-4 border-gray-300 rounded-md">
                <h3 className="font-bold">{dest.chainName}</h3>
                <p>{dest.tags}</p>
              </div>
            ))}
          </div>
          )
        ) : <p>Whoops! Something went wrong</p>}
      </div>
      <ChatInput />
    </div>
  </>
);

const ChatMessage = ({ avatar, message, button, className }: any) => {
  return (
    <div className={`flex space-x-4 items-start ${className}`}>
      {avatar && (
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
            <Image
              width={200}
              height={200}
              src="/images/green-chatbot.svg"
              alt="Eeta Logo"
              className="w-12 h-12 p-1"
            />
          </div>
        </div>
      )}
      <div
        className={`bg-green-100 p-4 rounded-lg flex-1 ${
          button ? "cursor-pointer bg-[#00AE4F] text-green-900" : ""
        }`}
      >
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
      </div>
    </div>
  );
}


const ChatInput = () => {
  const { chatHistory, setChatHistory } = useChatContext() || {}
  const session = useSession();

  function submitChatInput(prompt: string) {
    // user msg
    setChatHistory && setChatHistory((prev) => {
      if (!prev) {
        return [{
          source: "user",
          message: prompt,
        }]
      }
      return [{
        source: "user",
        message: prompt,
      }, ...prev]
    })

    const resp = sendToCohere(prompt, (session.data?.user as any)?.tags);
    resp.then(
      (res) => {
        alert("success")
        console.log(res)
        // bot msg
        setChatHistory && setChatHistory((prev) => {
          if (!prev) {
            return [{
              source: "bot",
              message: res.text
            }]
          }
          return [{
            source: "bot",
            message: res.text
          }, ...prev]
        })

        // destinations cited
        setChatHistory && res.destinationCited && setChatHistory((prev) => {
          if (!prev) {
            return [{
              source: "bot",
              data: res.destinationCited.slice(
                0, Math.min(res.destinationCited.length, 10)
              )
            }]
          }
          return [{
            source: "bot",
            data: res.destinationCited,
          }, ...prev]
        })
      }
    ).catch(
      (err) => {
        console.log("awooga err", err)
      }
    )
  }

  const [prompt, setPrompt] =  useState<string>('');
  return (
    <div className="flex mt-4">
      <form
        onSubmit={(e) => { 
          e.preventDefault();
          submitChatInput(prompt) ;
        }}
        className="flex flex-row gap-0 w-full"
      >
        <input
          type="text"
          placeholder="Write your response..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none w-full"
          value={prompt}
          onChange={(e) => { 
            setPrompt(e.currentTarget.value)
          }}
        />
        <button className="px-4 py-2 bg-[#00AE4F] text-white rounded-r-lg" type="submit">
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
      </form>
    </div>
  );
}
