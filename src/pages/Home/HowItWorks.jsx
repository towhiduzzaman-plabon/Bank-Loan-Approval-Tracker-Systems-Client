// src/pages/Home/HowItWorks.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="bg-base-100 border rounded-2xl p-5 shadow-sm flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-3">{step.icon}</div>
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-xs text-gray-500">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
