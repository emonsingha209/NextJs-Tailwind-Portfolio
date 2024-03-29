"use client";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaHourglassEnd } from "react-icons/fa";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    const serviceID = process.env.SERVICE_ID;
    const templateID = process.env.TEMPLATE_ID;
    const publicKey = process.env.PUBLIC_KEY;
    try {
      setIsLoading(true);
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      form.reset();
      setIsEmailSent(true);
      toast({
        description: "Your message has been sent.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="flex flex-wrap-reverse py-6 overflow-hidden"
    >
      <motion.div
        variants={contactLeft}
        initial="initial"
        whileInView="animate"
        className="grid md:basis-1/2 place-items-center"
      >
        <Card className="w-full mt-8 md:mt-0">
          <CardHeader>
            <CardTitle>Behind the Scenes: Tech Choices</CardTitle>
            <CardDescription>
              This portfolio is crafted with the following modern technologies:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-6 ml-6 list-disc [&>li]:mt-2">
              <li>
                <span className="font-semibold">Next.js: </span>Utilized for
                optimized performance and server-side rendering.
              </li>
              <li>
                <span className="font-semibold">Tailwind CSS: </span>Employed
                for efficient styling with a utility-first approach.
              </li>
              <li>
                <span className="font-semibold">Shadcn UI: </span>Integrated for
                consistent and accessible UI components.
              </li>
              <li>
                <span className="font-semibold">Framer Motion:</span>Implemented
                for engaging animations and transitions.
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        variants={contactRight}
        initial="initial"
        whileInView="animate"
        className="grid md:basis-1/2 place-items-center"
      >
        <Card className="w-full xns:w-4/5">
          <CardHeader>
            <CardTitle>Get in Touch With Me</CardTitle>
            <CardDescription>
              Use the form below to send me a message or ask any questions
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
                  <Button type="submit" className="w-full xns:w-3/5" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <FaHourglassEnd className="w-4 h-4 mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
export default Contact;
