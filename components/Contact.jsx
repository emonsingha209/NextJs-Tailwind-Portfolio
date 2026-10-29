"use client";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinkRel } from "@/lib/seo";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaHourglassEnd } from "react-icons/fa";
import { IoIosDoneAll, IoMdSend } from "react-icons/io";
import { z } from "zod";

import contactDetails from "@/public/data/contact-details";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});
const ease = [0.16, 1, 0.3, 1];

const Contact = () => {
  const reduce = useReducedMotion();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const formRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(event) {
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_Email_PUBLIC_KEY;

    try {
      setIsLoading(true);
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      form.reset();
      setIsEmailSent(true);
      toast({
        description: (
          <>
            Your message has been sent.
            <IoIosDoneAll className="inline-block w-4 h-4 ml-2" />
          </>
        ),
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        description: "The message did not send. Check the fields and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 border-t border-border bg-background">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-28">
        <motion.div
          initial={reduce ? false : { x: -16 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
              Reach out
            </h2>
            <p className="mt-4 max-w-[68ch] text-base leading-7 text-muted-foreground">
              Email, phone, or LinkedIn. The location is where I am based.
            </p>
            <address className="mt-8 grid gap-3 not-italic">
                {contactDetails.map((detail) => {
                  const rowClass =
                    "flex min-h-11 items-center gap-4 border border-border px-4 py-3 transition-colors";
                  const body = (
                    <>
                      <detail.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-oswald text-sm uppercase tracking-[0.08em] text-foreground">
                          {detail.type}
                        </p>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {detail.value}
                        </p>
                      </div>
                    </>
                  );

                  if (!detail.link || detail.link === "#") {
                    return (
                      <div key={detail.id} className={rowClass}>
                        {body}
                      </div>
                    );
                  }

                  const external = detail.link.startsWith("http");

                  return (
                    <Link
                      href={detail.link}
                      key={detail.id}
                      target={external ? "_blank" : undefined}
                      rel={socialLinkRel(detail.link)}
                      className={`${rowClass} hover:border-signal`}
                    >
                      {body}
                    </Link>
                  );
                })}
            </address>
          </div>
        </motion.div>
        <motion.div
          initial={reduce ? false : { x: 16 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <h2 className="text-balance font-playfair text-4xl italic leading-none text-foreground md:text-5xl">
              Write to me
            </h2>
            <p className="mt-4 max-w-[68ch] text-base leading-7 text-muted-foreground">
              Use the form to send a message or ask a question.
            </p>
            <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-8 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" className="min-h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="min-h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows="4"
                            placeholder="Your Message..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button
                      type="submit"
                      className="min-h-12 w-full bg-navy text-paper hover:bg-deep dark:bg-signal dark:text-navy dark:hover:bg-paper"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <FaHourglassEnd className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <IoMdSend className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    {isEmailSent ? (
                      <p className="mt-3 text-sm leading-6 text-foreground">
                        Your message has been sent.
                      </p>
                    ) : null}
                  </div>
                </form>
              </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;
