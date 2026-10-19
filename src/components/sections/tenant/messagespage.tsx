"use client";

import React, { useState } from "react";

import {
  ArrowLeft,
  MoreVertical,
  Search,
  RefreshCw,
  BotMessageSquare,
  Bell,
  X,
  ShieldAlert,
  SendHorizontal,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type Message = {
  id: string;
  text: string;
  time: string;
  sender: "me" | "owner";
};

type Conversation = {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Daniel Mwangi",
    description: "Property Owner",
    avatar: "",
    lastMessage: "Is the apartment still available?",
    time: "10:24 AM",
    unread: 2,
    messages: [
      {
        id: "1",
        text: "Hi! Is the apartment still available?",
        time: "10:12 AM",
        sender: "me",
      },
      {
        id: "2",
        text: "Yes, it is! The apartment is still available. Would you like more details or would you like to schedule a viewing?",
        time: "10:16 AM",
        sender: "owner",
      },
      {
        id: "3",
        text: "That would be great! Could you send me more photos and the exact location?",
        time: "10:20 AM",
        sender: "me",
      },
      
      {
        id: "9",
        text: "That would be great! Could you send me more photos and the exact location?",
        time: "10:20 AM",
        sender: "me",
      },
      {
        id: "10",
        text: "That would be great! Could you send me more photos and the exact location?",
        time: "10:20 AM",
        sender: "me",
      },
    ],
  },

  {
    id: "2",
    name: "Sarah Wanjiku",
    description: "Property Owner",
    avatar: "",
    lastMessage: "Could you send more photos of the apartment?",
    time: "Yesterday",
    unread: 1,
    messages: [
      {
        id: "1",
        text: "Hello Sarah, I'm interested in this apartment.",
        time: "Yesterday",
        sender: "me",
      },
      {
        id: "2",
        text: "Hi! Sure, I can send you more photos.",
        time: "Yesterday",
        sender: "owner",
      },
    ],
  },

  {
    id: "3",
    name: "James Otieno",
    description: "Property Owner",
    avatar: "",
    lastMessage: "Thanks for the quick response!",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "1",
        text: "Thanks for the quick response!",
        time: "Yesterday",
        sender: "owner",
      },
    ],
  },

  {
    id: "4",
    name: "Amina Hassan",
    description: "Property Owner",
    avatar: "",
    lastMessage: "I'm interested in this listing. Can we talk?",
    time: "Mon, Apr 21",
    unread: 3,
    messages: [
      {
        id: "1",
        text: "I'm interested in this listing. Can we talk?",
        time: "Mon, Apr 21",
        sender: "owner",
      },
    ],
  },

  {
    id: "5",
    name: "Brian Kibet",
    description: "Property Owner",
    avatar: "",
    lastMessage: "What are the check-in and check-out times?",
    time: "Mon, Apr 21",
    unread: 0,
    messages: [],
  },

  {
    id: "6",
    name: "Grace Mutiso",
    description: "Property Owner",
    avatar: "",
    lastMessage: "Is there parking available?",
    time: "Sun, Apr 20",
    unread: 1,
    messages: [],
  },

  {
    id: "7",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "8",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "9",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "10",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "11",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "12",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "13",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },

  {
    id: "14",
    name: "Kevin Njoroge",
    description: "Property Owner",
    avatar: "",
    lastMessage: "The place looks great! I'll book it.",
    time: "Sun, Apr 20",
    unread: 0,
    messages: [],
  },
];

export default function MessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chatId = searchParams.get("chatId");

  const [searchQuery, setSearchQuery] = useState("");
  const [showReminder, setShowReminder] = useState(true);

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === chatId
    ) ?? null;

  const showChat = Boolean(selectedConversation);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversation: Conversation) => {
    router.push(`/tenant/messages?chatId=${conversation.id}`);
  };

  const handleBackToConversations = () => {
    router.push("/tenant/messages");
  };

  /*
   * The height is deliberately controlled here rather than in the
   * global TenantLayout.
   *
   * Mobile list:
   *   main has top 6px + bottom 80px
   *
   * Mobile chat:
   *   main has top 6px + no bottom padding
   *
   * md:
   *   main has 20px top + 20px bottom
   *
   * lg:
   *   main has 20px top + 20px bottom
   *   TenantNavbar = 60px
   *   navbar margin-bottom = 16px
   */
  const mobileHeight = showChat
    ? "h-[calc(100dvh-6px)]"
    : "h-[calc(100dvh-86px)]";

return (
  <div
    className={`
      relative
      flex
      min-h-0
      min-w-0
      w-full
      shrink-0
      overflow-hidden
      ${showChat ? "h-[calc(100dvh-6px)]" : "h-[calc(100dvh-86px)]"}
      md:h-[calc(100dvh-40px)]
      lg:h-[calc(100dvh-116px)]
    `}
  >
    {/* =========================================================
        MESSAGES SIDEBAR
    ========================================================== */}

    <div
      className={`
        relative
        flex
        h-full
        min-h-0
        w-full
        min-w-0
        flex-col
        overflow-hidden
        border-gray-200
        dark:border-gray-800
        md:shrink-0
        md:w-86
        lg:w-96
        ${showChat ? "hidden md:flex" : "flex"}
      `}
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-2 md:pt-0">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          Messages
        </p>
      </div>

      {/* Search */}
      <div className="shrink-0 px-3 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />

          <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-10 md:h-12 w-full rounded-2xl border-2 pl-11 pr-4 text-md text-gray-900 outline-none
                          placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 
                          bg-transparent dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 
                          dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-150"
              placeholder="Search conversations..."
          />
        </div>
      </div>

      {/* Conversation cards */}
      <div className="slim-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() =>
              handleConversationClick(conversation)
            }
            className={`
              flex
              w-full
              items-center
              gap-3
              border-b
              border-gray-100
              px-4
              py-4
              text-left
              transition-colors
              dark:border-gray-800
              ${
                conversation.id === chatId
                  ? "bg-blue-50 dark:bg-blue-500/10"
                  : "hover:bg-gray-50 dark:hover:bg-gray-900"
              }
            `}
          >
            {/* Keep your Avatar component */}
            <Avatar
              status="online"
              size="md"
              alt={conversation.name}
              src={
                conversation.avatar ||
                "/images/avatarnone1.png"
              }
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {conversation.name}
                </p>

                <span className="shrink-0 text-[11px] text-gray-400">
                  {conversation.time}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {conversation.lastMessage}
                </p>

                {conversation.unread > 0 && (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-[10px] font-semibold text-white">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="relative shrink-0 md:hidden">
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center px-3">
          <Alert className="flex flex-row w-full shadow-md">
            <AlertDescription className="flex items-center gap-2">
              <ShieldAlert className="size-5 shrink-0" />

              <p className="flex flex-col text-sm">
                We automatically delete messages after 30 days
                to protect your privacy and retention policies.
              </p>
            </AlertDescription>
            {/* <AlertAction>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => setShowReminder(false)}
              >
                <X className="size-4" />
              </Button>
            </AlertAction>*/}
          </Alert>
        </div>
      </div>
    </div>

    {/* =========================================================
        CHAT PANEL
    ========================================================== */}

    <div
      className={`
        flex
        h-full
        min-h-0
        min-w-0
        flex-1
        flex-col
        overflow-hidden
        ${showChat ? "flex" : "hidden md:flex"}
      `}
    >
      {showChat ? (
        <>
          {/* =======================================================
              CHAT HEADER
          ======================================================== */}

          <div className="flex h-16 shrink-0 items-center justify-between bg-white px-3 dark:border-gray-800 dark:bg-black md:px-5"   >
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile back button */}
              <button
                type="button"
                onClick={handleBackToConversations}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
                <ArrowLeft className="size-5" />
              </button>
          
              {/* Existing Avatar */}
              <Avatar
                status="online"
                size="sm"
                alt={selectedConversation?.name}
                src={
                  selectedConversation?.avatar ||
                  "/images/avatarnone1.png"
                }
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {selectedConversation?.name}
                </p>
              
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {selectedConversation?.description}
                </p>
              </div>
            </div>
              
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
            >
              <MoreVertical className="size-5" />
            </Button>
          </div>
              
          {/* =======================================================
              MESSAGE AREA
          ======================================================== */}

          <div
           className="
             relative
             min-h-0
             flex-1
             overflow-hidden
             bg-gray-50/50
             dark:bg-black
           "
         >
           {/* Floating alert */}
            {showReminder && (
              <div className="pointer-events-none absolute left-0 right-0 top-3 z-20 flex justify-center px-4">
                <Alert className="pointer-events-auto w-full bg-gray-800 dark:bg-blue-700 max-w-md shadow-md">
                  <AlertDescription className="flex items-center gap-2">
                    <Bell className="size-5 shrink-0" />

                    <p className="text-sm">
                      <strong>Reminder:</strong> Keep all communication within the app
                      for your security and compliance.
                    </p>
                  </AlertDescription>

                  <AlertAction>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-7"
                      onClick={() => setShowReminder(false)}
                    >
                      <X className="size-4" />
                    </Button>
                  </AlertAction>
                </Alert>
              </div>
            )}
         
           {/* Scrollable messages */}
           <div
             className="
               slim-scrollbar
               h-full
               overflow-y-auto
               overscroll-contain
               px-4
               py-5
               pb-10
               md:px-6
             "
           >
             <div className="mx-auto flex max-w-3xl flex-col gap-4">
               
               <div className="flex justify-center">
                 <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                   Today
                 </span>
               </div>
         
               {selectedConversation?.messages.map((message) => {
                 const isMine = message.sender === "me";
         
                 return (
                   <div
                     key={message.id}
                     className={`flex items-end gap-2 ${
                       isMine ? "justify-end" : "justify-start"
                     }`}
                   >
                     {!isMine && (
                       <Avatar
                         status="online"
                         size="xs"
                         alt={selectedConversation.name}
                         src={
                           selectedConversation.avatar ||
                           "/images/avatarnone1.png"
                         }
                       />
                     )}
         
                     <div className="max-w-[80%] md:max-w-[70%]">
                       <div
                         className={`
                           rounded-2xl
                           px-3
                           py-2.5
                           text-sm
                           leading-relaxed
                           ${
                             isMine
                               ? "rounded-br-md bg-blue-600 text-white"
                               : "rounded-bl-md bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
                           }
                         `}
                       >
                         {message.text}
                       </div>
         
                       <p
                         className={`
                           mt-1
                           text-[10px]
                           text-gray-400
                           ${isMine ? "text-right" : "text-left"}
                         `}
                       >
                         {message.time}
                       </p>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
            
          {/* =======================================================
              COMPOSER
          ======================================================== */}

          <div
            className="
              shrink-0
              border-gray-200
              bg-white
             dark:bg-black
              p-2
              dark:border-gray-800
              md:p-1
              md:bg-none
            "
          >
            <div className="mx-auto flex max-w-3xl items-center gap-2">
              <Input
                placeholder="Type a message..."
                className="min-w-0 flex-1"
              />

              <Button
                type="button"
                size="icon"
                className="size-10 shrink-0 rounded-full bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)]"
              >
                <SendHorizontal className="size-6" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full w-full items-center justify-center">
            <Empty className="flex items-center justify-center">
              <EmptyHeader>
                <EmptyTitle>No Conversations</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  You&apos;re all caught up. New notifications will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex flex-row items-center justify-center gap-2">
                <Button variant="outline">
                  <RefreshCw data-icon="inline-start" />
                  Refresh
                </Button>
                <Button variant="outline">
                  <BotMessageSquare data-icon="inline-start" size="5" />
                  Ask AI
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        </>
      )}
    </div>
  </div>
);



/* ================================================================
   CONVERSATION CARD
================================================================ */

function ConversationCard({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        border-b
        border-gray-100
        px-4
        py-4
        text-left
        transition-colors
        dark:border-gray-800/70
        ${
          active
            ? "bg-blue-50/70 dark:bg-blue-500/10"
            : "hover:bg-gray-50 dark:hover:bg-gray-900"
        }
      `}
    >
      {/* IMPORTANT:
          Existing Avatar component retained exactly.
      */}
      <Avatar
        status="online"
        size="md"
        alt={conversation.name}
        src={
          conversation.avatar ||
          "/images/avatarnone1.png"
        }
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {conversation.name}
          </h3>

          <span className="shrink-0 text-[11px] text-gray-400">
            {conversation.time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {conversation.lastMessage}
          </p>

          {conversation.unread > 0 && (
            <span
              className="
                flex
                size-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[var(--color-accent-gold)]
                text-[10px]
                font-semibold
                text-white
              "
            >
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ================================================================
   MESSAGE BUBBLE
================================================================ */

function MessageBubble({
  message,
  conversation,
}: {
  message: Message;
  conversation: Conversation;
}) {
  const isMine = message.sender === "me";

  return (
    <div
      className={`
        flex
        w-full
        items-end
        gap-2
        ${isMine ? "justify-end" : "justify-start"}
      `}
    >
      {/* IMPORTANT:
          Existing Avatar component retained exactly.
      */}
      {!isMine && (
        <Avatar
          status="online"
          size="xs"
          alt={conversation.name}
          src={
            conversation.avatar ||
            "/images/avatarnone1.png"
          }
        />
      )}

      <div
        className={`
          max-w-[82%]
          md:max-w-[70%]
          ${
            isMine
              ? "items-end"
              : "items-start"
          }
        `}
      >
        <div
          className={`
            rounded-2xl
            px-3
            py-2.5
            text-sm
            leading-relaxed
            ${
              isMine
                ? "rounded-br-md bg-blue-600 text-white"
                : "rounded-bl-md bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
            }
          `}
        >
          {message.text}
        </div>

        <div
          className={`
            mt-1
            text-[10px]
            text-gray-400
            ${isMine ? "text-right" : "text-left"}
          `}
        >
          {message.time}
        </div>
      </div>
    </div>
  );
}
}
