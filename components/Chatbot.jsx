"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const waiting = isTyping && !messages.at(-1)?.text;

  return (
    <section id="chat" className="scroll-mt-28 border-t border-border bg-background">
      <div className="container grid gap-10 py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-16 md:py-28">
        <div className="md:sticky md:top-24">
          <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
            Ask Emon
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <Image
              src={emon}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <p className="max-w-[36ch] text-base leading-7 text-foreground">
              {PortfolioData.name}, {PortfolioData.title}. Ask about the work,
              the roles, or how to get in touch. Answers stay inside the written record.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div
            className={cn(
              "flex flex-col",
              messages.length > 0 && "max-h-[28rem] overflow-y-auto [scrollbar-width:thin]"
            )}
          >
            <article className="border-t border-border py-5">
              <p className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
                Emon
              </p>
              <p className="mt-2 max-w-[68ch] text-base leading-7 text-foreground">
                Welcome. I&apos;m Emon Singha. Ask about the work or the engineering.
              </p>
            </article>
            {messages.map((msg, idx) =>
              msg.text ? (
                <article key={idx} className="border-t border-border py-5">
                  <p className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
                    {msg.sender === "user" ? "You" : "Emon"}
                    <span className="ml-3">{msg.timestamp}</span>
                  </p>
                  <div className="mt-2 max-w-[68ch] break-words text-base leading-7 text-foreground [&_a]:underline [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </article>
              ) : null
            )}
            {waiting ? (
              <p className="border-t border-border py-5 font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
                Writing
              </p>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSend(input);
            }}
            className="border-t border-border pt-5"
          >
            <label
              htmlFor="chat-question"
              className="font-oswald text-sm uppercase tracking-[0.08em] text-foreground"
            >
              Your question
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                id="chat-question"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about the work"
                disabled={isTyping}
                className="min-h-12 min-w-0 flex-1"
              />
              <Button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="min-h-12 bg-navy text-paper hover:bg-deep dark:bg-signal dark:text-navy dark:hover:bg-paper sm:px-8"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
