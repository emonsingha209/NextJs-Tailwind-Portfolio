"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      if (res.ok) {
        const botMessage = { text: data.reply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: `Error: ${data.error || "Couldn’t get a response"}`,
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Network issue", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto duration-300 shadow-lg animate-in slide-in-from-bottom-10">
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground">
              Welcome! I’m [Your Name]—feel free to ask about my work or
              experience.
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my projects or skills..."
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
