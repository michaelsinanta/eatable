"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import sendToCohere from "./actions/rag";
import { useChatContext } from "@/context/ChatContext";
import { SessionContextValue, useSession } from "next-auth/react";
import { Merchant } from "@prisma/client";
import { DefaultUser, Session } from "next-auth";
import { IoSend } from "react-icons/io5";
import { getAllMerchants } from "../(authenticated)/merchant/[id]/actions/merchant.action";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import MerchantList from "../(authenticated)/merchant/components/MerchantList";

interface MerchantPageProps {
  detail: any;
  //   user: DefaultUser & { tags?: string[] };
  merchants: any;
}

export default function Homepage(props: MerchantPageProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const { chatHistory, setChatHistory } = useChatContext() || {};
  const session = useSession();

  const toggleChat = () => {
    if (!chatOpen && (!chatHistory || chatHistory?.length === 0)) {
      console.log("session:", session);
      if (session.status !== "authenticated") {
        console.log("user not ready yet");
        return;
      }
      setChatHistory &&
        setChatHistory((prev) => {
          if (!prev) {
            return [
              {
                data: null,
                message: `Hi, ${
                  session.data?.user?.name || "NONE"
                }! What do you want to eat today?`,
                source: "bot",
              },
            ];
          }
          return [
            {
              data: null,
              message: `Hi, ${
                session.data?.user?.name || "NONE"
              }! What do you want to eat today?`,
              source: "bot",
            },
            ...prev,
          ];
        });
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
      <Recommendations detail={props.detail} />
      <h2 className="text-lg font-semibold mb-2 ml-5">Near You</h2>
      <MerchantList detail={props.merchants.slice(0, Math.min(props.merchants.length, 7))} />
      {chatOpen && <Chat toggleChat={toggleChat} chatHistory={chatHistory} />}
    </div>
  );
}

const Header = () => {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            // console.log("addr", data)
            // setAddress(data.display_name);
            setAddress(`${data.address.road}, ${data.address.commercial}, ${data.address.city}, ${data.address.country} ${data.address.postcode}`)
          } catch (err) {
            console.log("Failed to fetch address");
            setAddress("South Quarter, Jakarta, Indonesia");
          }
        },
        (err) => {
          console.log("Failed to get location: " + err.message);
          setAddress("South Quarter, Jakarta, Indonesia");
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
      setAddress("South Quarter, Jakarta, Indonesia");
    }
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-4 pb-16">
      <div className="text-white h-fit max-h-[10dvh]">
        <p className="">Deliver to:</p>
        <p className=" font-semibold max-w-[80%]">{address || "loading..."}</p>
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
}

const ChatBubble = () => {
  return (
    <div className="flex items-center px-4 mt-16 h-full">
        <div className="w-16 h-16 rounded-xl border-2 border-[#00AE4F] flex items-center justify-center mb-auto">
          <Image
            width={200}
            height={200}
            src="/images/green-chatbot.svg"
            alt="Eeta Logo"
            className="w-12 h-12 p-1"
          />
        </div>
      <div className="ml-3 w-2/3">
        <div className="border-[#00AE4F] border-2 text-[#006A2F] mb-3 p-3 max-w-xs rounded-r-xl rounded-b-xl">
          Hi! What do you want to eat today?
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ toggleChat }: any) => (
  <div className="bg-white">
    <div className="w-full flex justify-between items-center h-full">
      <ChatBubble />
    </div>

    <div className="w-full bg-white flex-shrink-0 h-12 px-5 mb-7">
      <button
        onClick={toggleChat}
        className="w-full justify-center rounded-b-xl rounded-l-xl bg-[#00AE4F] px-5 py-3 text-center text-md font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
      >
        Talk to Eeta!
      </button>
    </div>

    <FoodOptions />
  </div>
);

const foodImages = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_WkuSJN7xa0xuMtYaWNxwErHgGqDL_LsxA&usqp=CAU",
    category: "Chicken",
  },
  {
    url: "/assets/pasta.jpeg", // the sndimg.com image wont load, gue dl aja
    category: "Pasta",
  },
  {
    url: "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg",
    category: "Healthy",
  },
  {
    url: "https://cdn.vox-cdn.com/thumbor/bif3U7XKUqWpOUv91_fXLfzsIx8=/0x0:6000x4000/1200x675/filters:focal(2520x1520:3480x2480)/cdn.vox-cdn.com/uploads/chorus_image/image/71262429/Le_Fantome.0.jpg",
    category: "Rice",
  },
  {
    url: "https://assets.clevelandclinic.org/transform/2ff894bb-c69e-46b6-97f2-a9bcc69ecfd3/snack-foods-1263686908",
    category: "Snack",
  },
  {
    url: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    category: "Fast food",
  },
];

const FoodOptions = () => (
  <div className="flex space-x-4 overflow-x-auto no-scrollbar my-10">
    {foodImages.map((food, index) => (
      <div key={index} className="flex flex-col ml-5">
        <div
          key={index}
          className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden"
        >
          <Image
            width={200}
            height={200}
            src={food.url}
            alt={`Chicken ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-black text-center mt-2 font-light text-sm w-full">{food.category}</h1>
      </div>
    ))}
  </div>
);

const Recommendations = ({ detail }: { detail: any[] }) => (
  <>
    <h2 className="text-lg font-semibold mb-4 ml-5">Recommended For You</h2>
    <div className="flex overflow-x-auto no-scrollbar ml-5">
      {detail.map((merchant, index) => (
        <div
          key={merchant.id}
          className="flex flex-col items-start gap-x-2 cursor-pointer w-[300px]"
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
          <div className="flex-1 p-1 h-fit">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold">{merchant.chainName}</h3>
            </div>
            <div className="text-sm flex flex-row gap-3 text-gray-500">
              <p>
                <span className="font-semibold">$</span>$$$
              </p>
              {/* <p className="whitespace-nowrap">
                {distances[index] ? `${distances[index].distance} km` : "..."}
              </p>
              <p>
                {distances[index]
                  ? `Delivery in ${distances[index].time} min`
                  : "..."}
              </p> */}
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
  </>
);

type ChatType = {
  toggleChat: any;
  chatHistory?: any[];
};

const Chat = ({ toggleChat, chatHistory }: ChatType) => (
  <>
    <div className="fixed inset-0 bg-black opacity-75 z-10"></div>
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white p-4 rounded-t-2xl shadow-lg z-20 md:max-w-md md:mx-auto">
      <div className="flex items-center justify-between mb-4">
        {/* <span className="text-lg font-bold">Eeta Bot</span> */}
        <button className="text-[#00AE4F]" onClick={toggleChat}>
          Back
        </button>
      </div>
      <div className="gap-y-4 pt-5 overflow-y-scroll h-fit max-h-[70dvh] flex flex-col-reverse px-4">
        {chatHistory ? (
          chatHistory.map((item, idx) =>
            !item.data ? (
              <ChatMessage
                source={item.source}
                key={idx}
                avatar={
                  item.source === "bot" && (
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
                  )
                }
                message={item.message}
                className={item.source === "bot" ? "text-start" : "text-end"}
              />
            ) : (
              <div key={idx} className="flex flex-col gap-2">
                {item.data.map((dest: any, i: number) => (
                  <Link key={i} href={`/merchant/${dest.id}`}>
                    <div className="relative border border-gray-300 rounded-md cursor-pointer">
                      <div className="absolute top-0 left-0 bg-[#00AE4F] text-white text-xs font-semibold px-2 py-1 rounded-br-lg flex flex-row gap-1 items-center">
                        <FaStar />
                        <p className="my-auto">
                          {dest.merchantBrief.rating} (
                          {dest.merchantBrief.vote_count})
                        </p>
                      </div>
                      <Image 
                        src={dest.merchantBrief.photoHref} 
                        alt={"Merchant picture"} 
                        width={200}
                        height={100}
                        className="w-full object-cover rounded-t-md max-h-[150px]"
                      />
                      <div className="px-6 py-4 mb-2 h-full">
                        <h3 className="font-semibold text-xl">{dest.chainName}</h3>
                        <p>{dest.merchantBrief.description}</p>
                        <p>Serves: {dest.merchantBrief.cuisine.join(", ")}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {dest.tags.map((cuisineItem: string, j: number) => (
                            <>
                              <span className="bg-green-500 text-white rounded-full px-3 w-fit text-sm">{cuisineItem}</span>
                            </>
                          ))}
                          {!dest.tags || dest.tags.length === 0 && <>
                            <span className="bg-red-100 rounded-full px-3 w-fit text-sm">No Tags</span>
                          </>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          )
        ) : (
          <p>Whoops! Something went wrong</p>
        )}
      </div>
      <ChatInput />
    </div>
  </>
);

const ChatMessage = ({ avatar, message, button, className, source }: any) => {
  return (
    <div
      className={`flex ${
        avatar ? "items-start space-x-2" : "justify-end space-x-reverse"
      } ${className}`}
    >
      {avatar && (
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl border-2 border-[#00AE4F] flex items-center justify-center">
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
        className={`mb-3 p-3 max-w-xs ${
          !avatar
            ? "bg-[#00AE4F] text-white self-end w-fit"
            : "border-[#00AE4F] border-2 text-[#006A2F]"
        } ${
          source === "bot"
            ? "rounded-r-xl rounded-b-xl"
            : "rounded-l-xl rounded-b-xl"
        }
        ${button ? "cursor-pointer bg-[#00AE4F] text-green-900" : ""}`}
      >
        <p style={{ whiteSpace: "pre-line" }}>{message}</p>
      </div>
    </div>
  );
};

const ChatInput = () => {
  const { chatHistory, setChatHistory } = useChatContext() || {};
  const session = useSession();

  function submitChatInput(prompt: string) {
    // user msg
    setChatHistory &&
      setChatHistory((prev) => {
        if (!prev) {
          return [
            {
              source: "user",
              message: prompt,
            },
          ];
        }
        return [
          {
            source: "user",
            message: prompt,
          },
          ...prev,
        ];
      });

    const resp = sendToCohere(prompt, (session.data?.user as any)?.tags);
    resp
      .then((res) => {
        // alert("success");
        // console.log(res);
        // bot msg
        setChatHistory &&
          setChatHistory((prev) => {
            if (!prev) {
              return [
                {
                  source: "bot",
                  message: res.text,
                },
              ];
            }
            return [
              {
                source: "bot",
                message: res.text,
              },
              ...prev,
            ];
          });

        // destinations cited
        setChatHistory &&
          res.destinationCited &&
          setChatHistory((prev) => {
            if (!prev) {
              return [
                {
                  source: "bot",
                  data: res.destinationCited.slice(
                    0,
                    Math.min(res.destinationCited.length, 5)
                  ),
                },
              ];
            }
            return [
              {
                source: "bot",
                data: res.destinationCited,
              },
              ...prev,
            ];
          });
      })
      .catch((err) => {
        console.log("awooga err", err);
      });
  }

  const [prompt, setPrompt] = useState<string>("");
  return (
    <div className="flex mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitChatInput(prompt);
          setPrompt("");
        }}
        className="flex flex-row gap-0 w-full"
      >
        <input
          type="text"
          placeholder="Write your response..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none w-full"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.currentTarget.value);
          }}
        />
        <button
          className="px-4 py-2 bg-[#00AE4F] text-white rounded-r-lg"
          type="submit"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};
