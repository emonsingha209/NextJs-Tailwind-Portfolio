"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import emon from "@/public/img/emon2.webp";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleDismiss = () => {
    setIsCardVisible(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const templateQuestions = [
    "Tell me about yourself",
    "What projects have you worked on?",
    "What are your skills?",
    "How can I contact you?",
  ];

  // Effect to handle scrolling behavior when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll"); // Disable background scroll
    } else {
      document.body.classList.remove("no-scroll"); // Re-enable background scroll
    }

    // Cleanup: Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        if (res.ok) {
          const botMessage = {
            text: data.reply,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: `Error: ${data.error || "Couldn't get a response"}`,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }
      }, 1000);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Error: Network issue",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const handleTemplateQuestion = (question) => {
    setInput(question);
    handleSend(question);
  };

  return (
    <>
     {isCardVisible && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="fixed right-6 bottom-20 z-50 w-64 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 shadow-lg shadow-purple-500/50 p-4 flex items-center justify-between"
        >
          <div
            onClick={() => {
              handleOpen();
              setIsCardVisible(false); // Open chatbot and hide card
            }}
            className="cursor-pointer flex items-center gap-3"
          >
            {/* Speech Bubble SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 text-white drop-shadow-md"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-11.5 7.5L3 21l2-6.5A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5z" />
              <motion.g>
                <motion.circle
                  cx="8"
                  cy="10"
                  r="1"
                  fill="currentColor"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                />
                <motion.circle
                  cx="12"
                  cy="10"
                  r="1"
                  fill="currentColor"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                />
                <motion.circle
                  cx="16"
                  cy="10"
                  r="1"
                  fill="currentColor"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />
              </motion.g>
            </svg>
            <span className="text-white font-semibold text-sm drop-shadow-md">
              Chat with me!
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </motion.div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg h-[600px] flex flex-col shadow-xl border-none bg-background/95 backdrop-blur-sm rounded-3xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                <Image
                  src={emon}
                  alt="Emon Singha"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">Emon Singha</h3>
                  <p className="text-sm text-muted-foreground">
                    Jr. Software Engineer
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 custom-scrollbar chatbot-messages">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-6">
                  <p className="mb-4">
                    Welcome! I&apos;m Emon Singha—ask me anything about my work or
                    expertise.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {templateQuestions.map((question, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleTemplateQuestion(question)}
                        className="text-xs rounded-full hover:bg-primary/10"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-end mb-4",
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender === "bot" && (
                      <Image
                        src={emon}
                        alt="Emon Singha"
                        width={30}
                        height={30}
                        className="rounded-full mr-2 mb-1"
                      />
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl p-3 text-sm leading-6 tracking-normal font-lato",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none",
                        "shadow-sm"
                      )}
                    >
                      <Markdown>{msg.text}</Markdown>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex items-end mb-4">
                  <Image
                    src={emon}
                    alt="Emon Singha"
                    width={30}
                    height={30}
                    className="rounded-full mr-2 mb-1"
                  />
                  <div className="bg-muted rounded-2xl p-3 shadow-sm rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex w-full gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isTyping}
                  className="flex-1 rounded-full border-muted focus:ring-2 focus:ring-primary"
                />
                <Button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="rounded-full px-4 aspect-square"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
