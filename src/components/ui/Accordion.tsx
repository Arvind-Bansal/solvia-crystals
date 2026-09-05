"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Generate FAQ structured data for SEO */
  structuredData?: boolean;
}

export function Accordion({ items, structuredData = false }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const jsonLd = structuredData
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border border-[#262626]/10 rounded-sm bg-white overflow-hidden shadow-xs"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#F2EDE4]/50 transition-colors"
              aria-expanded={openIndex === idx}
            >
              <span className="text-[#262626] font-serif text-base md:text-lg pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-[#262626]/80 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}
