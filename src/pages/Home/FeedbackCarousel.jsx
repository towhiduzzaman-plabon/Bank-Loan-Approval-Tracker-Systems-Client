// src/pages/Home/FeedbackCarousel.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const feedbacks = [
  {
    name: "Rahim Ahmed",
    role: "NGO Manager",
    text: "LoanLink saved us hours of manual Excel work every single week. Our team can finally focus on people, not paperwork.",
    photo:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Sara Hossain",
    role: "Microfinance Officer",
    text: "Clear visibility of pending, approved and rejected loans in one place. The dashboard feels clean and reliable.",
    photo:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Jamal Uddin",
    role: "Borrower",
    text: "I can easily track my loan status, next EMI date and payment history from my phone. No more confusion or surprise fees.",
    photo:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Alisha Karim",
    role: "Loan Agency Owner",
    text: "Our approval workflow, reminders and collections are now automated. LoanLink feels like an extra teammate.",
    photo:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Kabir Hasan",
    role: "Field Officer",
    text: "The mobile-friendly design lets me update applications on the go. Branch visits are faster and far more organized.",
    photo:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const AUTO_DELAY = 5500; // 5.5s

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % feedbacks.length);
    }, AUTO_DELAY);
    return () => clearInterval(id);
  }, []);

  const current = feedbacks[index];

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % feedbacks.length);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 my-20">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.25em] uppercase text-purple-500 font-semibold">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mt-1">
          Customer Feedback
        </h2>
      </div>

      <div className="relative">
        {/* gradient background strip behind card */}
        <div className="absolute inset-x-10 -inset-y-2 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-yellow-400/10 blur-2xl rounded-[40px] pointer-events-none" />

        <div className="relative bg-white/80 dark:bg-base-200/80 backdrop-blur-xl rounded-[32px] shadow-xl border border-white/70 dark:border-base-300 px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Avatar + name */}
            <motion.div
              key={current.name + "-avatar"}
              className="flex md:flex-col items-center md:items-start gap-4 md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg border-2 border-purple-500/60 flex-shrink-0">
                <img
                  src={current.photo}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-base md:text-lg">
                  {current.name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {current.role}
                </p>
              </div>
            </motion.div>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + "-quote"}
                className="md:flex-1 text-left md:pr-4"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45 }}
              >
                <FaQuoteLeft className="text-2xl md:text-3xl text-purple-500/80 mb-3" />
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                  “{current.text}”
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls + dots */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="btn btn-xs md:btn-sm rounded-full border-gray-200 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                type="button"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={goNext}
                className="btn btn-xs md:btn-sm rounded-full border-gray-200 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                type="button"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2 justify-center flex-1">
              {feedbacks.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="h-2 rounded-full bg-gray-300"
                  style={{ width: i === index ? 18 : 6 }}
                  animate={{
                    backgroundColor:
                      i === index ? "rgb(124 58 237)" : "rgb(209 213 219)",
                    opacity: i === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
