import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
      {/* left text */}
      <div>
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Smart Microloan Tracking with{" "}
          <span className="text-primary">LoanLink</span>
        </motion.h1>
        <motion.p
          className="text-sm md:text-base text-gray-500 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Manage loan requests, verification, approvals, EMI schedules and
          repayments in one simple dashboard - built for microfinance teams and
          NGOs.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/all-loans" className="btn btn-primary btn-sm md:btn-md">
            Explore Loans
          </Link>
          <Link to="/dashboard/my-loans" className="btn btn-outline btn-sm md:btn-md">
            Apply for Loan
          </Link>
        </motion.div>
      </div>

      {/* right image */}
      <motion.div
        className="relative order-first md:order-none"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src={heroImg}
            alt="Loan management"
            className="w-full h-56 sm:h-64 md:h-80 object-cover"
          />
        </div>
        <div className="hidden sm:block absolute -bottom-4 -left-4 bg-base-100 shadow-lg rounded-2xl px-4 py-3 text-xs">
          <p className="font-semibold">Real-time approval tracking</p>
          <p className="text-gray-500">Keep every application on radar.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
