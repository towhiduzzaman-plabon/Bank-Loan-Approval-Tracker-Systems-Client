// src/pages/Home/FeedbackCarousel.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const feedbacks = [
  {
    name: "Rahim, NGO Manager",
    text: "LoanLink saved us hours of manual Excel work every week.",
  },
  {
    name: "Sara, Microfinance Officer",
    text: "Clear visibility of pending and approved loans in one place.",
  },
  {
    name: "Jamal, Borrower",
    text: "I can easily track my loan status and payments.",
  },
];

const FeedbackCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % feedbacks.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  const current = feedbacks[index];

  return (
    <section className="max-w-3xl mx-auto px-4 my-10 text-center">
      <h2 className="text-2xl font-bold mb-3">Customer Feedback</h2>
      <div className="bg-base-100 border rounded-3xl p-6 shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <p className="text-sm md:text-base text-gray-600 italic mb-2">
              “{current.text}”
            </p>
            <p className="text-xs text-gray-500 font-semibold">
              — {current.name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeedbackCarousel;
