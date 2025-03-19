"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import emon from "@/public/img/emon.webp";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const templateQuestions = [
    "Tell me about yourself",
    "What projects have you worked on?",
    "What are your skills?",
    "How can I contact you?",
  ];

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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: `Error: ${data.error || "Couldn't get a response"}`,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 z-50"
        aria-label="Open chatbot"
      >
        <MessageSquare className="h-6 w-6 text-primary-foreground" />
      </Button>

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
                  <p className="text-sm text-muted-foreground">Jr. Software Engineer</p>
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

            <CardContent className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-6">
                  <p className="mb-4">
                    Welcome! I'm Emon Singha—ask me anything about my work or expertise.
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
                        "max-w-[75%] rounded-2xl p-3",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none",
                        "shadow-sm"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                    </div>
                    {msg.sender === "user" && (
                      <div className="w-[30px] h-[30px] rounded-full bg-gray-300 ml-2 mb-1 flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">U</span>
                      </div>
                    )}
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
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
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