"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Added shadcn Badge
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare, X, Send, User } from "lucide-react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className={cn(
            "fixed right-6 bottom-20 z-50 w-72 rounded-lg bg-background shadow-lg border border-border p-4",
            "hover:shadow-xl transition-shadow duration-300"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Image
                src={emon}
                alt="Emon Singha"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Emon Singha
                </h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Need help? Chat with me about projects or skills!
            </p>
          </div>

          {/* Action */}
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              handleOpen();
              setIsCardVisible(false);
            }}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Start Chat
          </Button>
        </motion.div>
      )}

      {!isCardVisible && !isOpen && (
        <Button
          variant="default"
          size="icon"
          onClick={handleOpen}
          className="fixed right-6 bottom-6 z-50 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
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
                    Welcome! I&apos;m Emon Singha—ask me anything about my work
                    or expertise.
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
