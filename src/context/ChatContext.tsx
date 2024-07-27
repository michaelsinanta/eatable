"use client"

import useIsRendered from "@/hooks/useIsRendered";
import { useSession } from "next-auth/react";
import { 
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type IChatHistory = any[]

interface IChatContext {
  chatHistory?: IChatHistory,
  setChatHistory?: Dispatch<SetStateAction<IChatHistory>>,
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export function ChatContextProvider({ children }: PropsWithChildren) {
  const isRendered = useIsRendered();
  const [chatHistory, setChatHistory] = useState<IChatHistory>([
  ]);
  
  const contextValues = useMemo(
    () => ({
      ...(isRendered && {
        chatHistory,
        setChatHistory,
      }),
    }),
    [
      isRendered,
      chatHistory,
      setChatHistory,
    ]
  );

  return (
    <ChatContext.Provider value={contextValues}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  return useContext(ChatContext);
};