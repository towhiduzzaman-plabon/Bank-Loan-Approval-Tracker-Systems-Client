// src/pages/Home/HowItWorks.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3, FiCheckCircle, FiCreditCard } from "react-icons/fi";

const steps = [
  {
    icon: <FiEdit3 />,
    title: "Apply Online",
    desc: "Borrowers submit a simple loan application with required documents.",
  },
  {
    icon: <FiCheckCircle />,
    title: "Review & Verify",
    desc: "Managers verify details, approve or reject with proper tracking.",
  },
  {
    icon: <FiCreditCard />,
    title: "Track & Repay",
    desc: "Monitor EMI schedules, repayments and fees in a single dashboard.",
  },
];

const AUTOPLAY_DELAY = 4500; // ms – কত সময় পর পর step বদলাবে

const HowItWorks = () => {
  const [active, setActive] = useState(0);

  // auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, []);

  const activeStep = steps[active];

  return (
    <section className="max-w-6xl mx-auto px-4 my-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-purple-500 mb-2">
          Simple 3-step flow
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">How It Works</h2>
        <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
          From online application to repayment – everything stays in one clean,
          trackable flow for borrowers, managers and admins.
        </p>
      </div>

      {/* main layout */}
      <div className="mt-10 grid lg:grid-cols-[1.35fr,1fr] gap-8 items-stretch">
        {/* Left side – video-like animated panel */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-500 to-sky-500 text-white shadow-2xl">
          {/* subtle glow */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,#ffffff44,transparent_55%)]" />
          <div className="relative p-6 md:p-8 h-full flex flex-col justify-between">
            {/* header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl md:text-3xl backdrop-blur">
                {activeStep.icon}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-1">
                  Step {active + 1} of {steps.length}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {activeStep.title}
                </h3>
              </div>
            </div>

            {/* animated description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStep.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="text-sm md:text-base text-white/90 max-w-xl"
              >
                {activeStep.desc}
              </motion.p>
            </AnimatePresence>

            {/* progress bar */}
            <div className="mt-8">
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  key={active}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_DELAY / 1000,
                    ease: "linear",
                  }}
                  className="h-full bg-white"
                />
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                Auto-plays like a video • you can also tap a card on the right
              </p>
            </div>
          </div>
        </div>

        {/* Right side – clickable cards */}
        <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {steps.map((step, index) => {
            const isActive = index === active;
            return (
              <motion.button
                key={step.title}
                type="button"
                onClick={() => setActive(index)}
                whileHover={{ y: -4 }}
                className={`group text-left rounded-2xl border bg-base-100/80 backdrop-blur px-4 py-4 flex items-start gap-3 transition-all ${
                  isActive
                    ? "border-purple-500 shadow-lg shadow-purple-200/70"
                    : "border-gray-200 hover:border-purple-400/70"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 group-hover:bg-purple-50 group-hover:text-purple-600"
                  }`}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-1">
                    Step {index + 1}
                  </p>
                  <h4 className="font-semibold text-sm md:text-base mb-0.5">
                    {step.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
