"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import emon from "@/public/img/emon-singha.jpeg";
import { PortfolioData } from "@/public/data/portfolio-data";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef([]);
  const isSendingRef = useRef(false);

  const templateQuestions = [
    "Tell me about yourself",
    "What projects have you worked on?",
    "What are your skills?",
    "How can I contact you?",
  ];

  useEffect(() => {
    if (!messages.length && !isTyping) return;
    const scroller = messagesEndRef.current?.parentElement;
    if (!scroller) return;
    scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const appendMessage = (message) => {
    const next = [...messagesRef.current, message];
    messagesRef.current = next;
    setMessages(next);
  };

  const updateLastMessage = (text) => {
    const current = messagesRef.current;
    if (!current.length) return;
    const next = current.map((item, index) =>
      index === current.length - 1 ? { ...item, text } : item
    );
    messagesRef.current = next;
    setMessages(next);
  };

  const handleSend = async (message) => {
    const trimmed = message.trim();
    if (!trimmed || isSendingRef.current) return;
    isSendingRef.current = true;

    const priorHistory = messagesRef.current;
    appendMessage({
      text: trimmed,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: priorHistory }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        appendMessage({
          text: `Error: ${data.error || "Couldn't get a response"}`,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      appendMessage({
        text: "",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        updateLastMessage(reply);
      }
      reply += decoder.decode();
      if (reply) updateLastMessage(reply);
    } catch (error) {
      const failed = "The reply did not come through. Ask again in a moment.";
      if (messagesRef.current.at(-1)?.sender === "bot" && !messagesRef.current.at(-1)?.text) {
        updateLastMessage(failed);
      } else {
        appendMessage({
          text: failed,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }
    } finally {
      isSendingRef.current = false;
      setIsTyping(false);
    }
  };

  return (
    <section id="chat" className="scroll-mt-28 border-t border-border bg-background">
      <div className="container grid gap-8 py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:py-28">
        <div>
          <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
            Ask Emon
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src={emon}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="max-w-[36ch] text-base leading-7 text-foreground">
              {PortfolioData.name}, {PortfolioData.title}. Ask about the work,
              the roles, or how to get in touch. Answers stay inside the written record.
            </p>
          </div>
        </div>

        <div>
          <div className="flex max-h-[28rem] flex-col gap-4 overflow-y-auto custom-scrollbar pr-1">
            {messages.length === 0 ? (
              <p className="max-w-[68ch] text-base leading-7 text-muted-foreground">
                Welcome. I&apos;m Emon Singha. Ask about the work or the engineering.
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-end gap-3",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.sender === "bot" ? (
                    <Image
                      src={emon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : null}
                  <div
                    className={cn(
                      "max-w-[75%] px-4 py-3 text-sm leading-6",
                      msg.sender === "user"
                        ? "bg-navy text-paper dark:bg-signal dark:text-navy"
                        : "bg-secondary text-foreground"
                    )}
                  >
                    <Markdown>{msg.text}</Markdown>
                    <span className="mt-1 block font-oswald text-xs uppercase tracking-[0.06em] opacity-70">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
            {isTyping ? (
              <p className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current align-middle" />
                Writing
              </p>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {templateQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => handleSend(question)}
                disabled={isTyping}
                className="inline-flex min-h-11 items-center border border-border px-4 text-left text-sm text-foreground transition-colors hover:border-signal disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend(input);
            }}
            className="mt-4 flex gap-2"
          >
            <label className="sr-only" htmlFor="chat-question">
              Your question
            </label>
            <Input
              id="chat-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the work"
              disabled={isTyping}
              className="min-h-11 flex-1"
            />
            <Button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Send question"
              className="min-h-11 min-w-11 bg-navy text-paper hover:bg-deep dark:bg-signal dark:text-navy dark:hover:bg-paper"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
