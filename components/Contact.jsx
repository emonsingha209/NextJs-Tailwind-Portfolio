"use client";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaHourglassEnd } from "react-icons/fa";
import { IoIosDoneAll, IoMdSend } from "react-icons/io";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
const contactLeft = {
  initial: {
    opacity: 0,
    translateX: "100%",
  },

  animate: {
    translateX: "0%",
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      type: "spring",
      stiffness: 50,
    },
  },
};
const contactRight = {
  initial: {
    opacity: 0,
    translateX: "-100%",
  },

  animate: {
    translateX: "0%",
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      type: "spring",
      stiffness: 50,
    },
  },
};
const Contact = () => {
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="relative z-10 mt-5">
      <div className="dark:bg-[url('/img/bg-image.svg')] bg-cover absolute z-0 w-full h-full rotate-180"></div>
      <div className="flex md:flex-row flex-col py-8 gap-5 md:gap-0 overflow-hidden container">
        <motion.div
          variants={contactLeft}
          initial="initial"
          whileInView="animate"
          className="grid md:basis-1/2 place-items-center"
        >
          <Card className="w-full xns:w-11/12 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Reach Out</CardTitle>
              <CardDescription>
                Reach out to me anytime using the following contact details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 ">
                {contactDetails.map((detail) => (
                  <Link
                    href={detail.link}
                    key={detail.id}
                    className={`${
                      detail.link === "#"
                        ? "cursor-not-allowed pointer-events-none"
                        : "cursor-pointer "
                    }`}
                  >
                    <div className="flex items-center space-x-4 rounded-lg transition-colors duration-1000 ease-primary border p-4 dark:hover:border-violet-500 hover:border-gray-300  cursor-pointer ">
                      <div>{<detail.icon className="w-6 h-6" />}</div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {detail.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          variants={contactRight}
          initial="initial"
          whileInView="animate"
          className="grid md:basis-1/2 place-items-center"
        >
          <Card className="w-full xns:w-11/12 ">
            <CardHeader>
              <CardTitle>Get in Touch With Me</CardTitle>
              <CardDescription>
                Use the form below to send me a message or ask any questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                  <div className="flex justify-center w-full">
                    <Button
                      type="submit"
                      className="w-full xns:w-3/5"
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
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;
