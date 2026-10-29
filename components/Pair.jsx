"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export const pairMark =
  "text-navy transition-colors duration-500 group-hover/pair:text-[#2451c4] dark:text-paper dark:group-hover/pair:text-signal";

export default function Pair({ id, record, work }) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className="group/pair scroll-mt-28 border-t border-border bg-background"
    >
      <div className="container grid items-start gap-12 py-16 md:grid-cols-2 md:gap-0 md:py-28">
        <motion.div
          className="md:pr-14"
          initial={reduce ? false : { x: -20 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          {record}
        </motion.div>
        <div className="border-border transition-colors duration-500 group-hover/pair:border-signal md:self-stretch md:border-l md:pl-14">
          <motion.div
            className="md:sticky md:top-20 md:max-h-[calc(100svh-6.5rem)] md:overflow-y-auto md:[scrollbar-width:thin]"
            initial={reduce ? false : { x: 20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            {work}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
