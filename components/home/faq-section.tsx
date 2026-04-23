"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is ResumeForge completely free?",
    a: "Yes! ResumeForge is 100% free to use. You can create, edit, and export unlimited resumes without paying a cent.",
  },
  {
    q: "Are the resumes ATS-compatible?",
    a: "Yes. Our ATS Pro template is specifically optimized for Applicant Tracking Systems. All templates use clean, parseable HTML that ATS software can read easily.",
  },
  {
    q: "Can I download my resume as a PDF?",
    a: "Absolutely. Use the 'Export PDF' button in the builder to download a print-quality PDF of your resume instantly.",
  },
  {
    q: "How many resumes can I create?",
    a: "There's no limit! Create as many resumes as you need — tailor one for each job application.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is stored securely in our database and is only accessible by you when you're logged in. We never sell or share your personal information.",
  },
  {
    q: "Can I switch templates after creating my resume?",
    a: "Yes! You can switch between all templates in real-time inside the builder without losing any of your content.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-secondary/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
