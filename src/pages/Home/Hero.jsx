import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Image URLs for the hero carousel
const heroImages = [
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // auto-play carousel
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
      {/* LEFT : text */}
      <div>
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          LoanLink - Microloan Tracking with{" "}
          <span className="text-primary">System</span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-gray-500 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Manage loan requests, verification, approvals, EMI schedules and
          repayments in one simple dashboard – built for microfinance teams and
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
          <Link
            to="/dashboard/my-loans"
            className="btn btn-outline btn-sm md:btn-md"
          >
            Apply for Loan
          </Link>
        </motion.div>
      </div>

      {/* RIGHT : cinematic card + floating pill */}
      <motion.div
        className="relative order-first md:order-none"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* main card */}
        <div className="rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 relative">
          {/* badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/70 text-[11px] text-white px-3 py-1 shadow">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live portfolio preview
            </span>
          </div>

          {/* autoplay image */}
          <div className="h-56 sm:h-64 md:h-80 w-full">
            <img
              src={heroImages[current]}
              alt="Modern microloan operations"
              className="w-full h-full object-cover"
            />
          </div>

          {/* overlay + text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-10 px-6 pb-4 pt-10 text-white pointer-events-none">
            <p className="text-[11px] tracking-[0.3em] uppercase text-slate-300 mb-1">
              Microloan operations
            </p>
            <h3 className="text-lg sm:text-xl font-semibold mb-1">
              Branch, field officers &amp; HQ working in one system.
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              Auto-sync approvals, repayments and risk from every location.
            </p>
          </div>

          {/* ⬇️ glass-style / transparent bottom strip */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              backdrop-blur-md
              bg-white/10
              border-t border-white/20
              text-xs text-white
              px-5 py-3
              flex items-center justify-between
              rounded-b-[32px]
            "
          >
            <span className="text-white/85">
              Scenes from modern lending teams
            </span>
            <div className="flex items-center gap-1">
              {heroImages.map((_, i) => (
                <span
                  key={i}
                  className={
                    "rounded-full transition-all " +
                    (i === current
                      ? "w-3 h-3 bg-white shadow-md"
                      : "w-2 h-2 bg-white/50")
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* floating pill – bottom-left */}
        <div
          className="
            hidden sm:block
            absolute
            left-0
            -bottom-16
            bg-base-100/95 
            rounded-2xl border border-base-300
            shadow-xl px-6 py-4 text-xs md:text-sm
            backdrop-blur-md
          "
        >
          <p className="font-semibold mb-1">Real-time approval tracking</p>
          <p className="text-gray-500">
            Keep every borrower &amp; application on your radar.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
