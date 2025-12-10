import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    title: "Community loan briefing",
    caption: "Loan officers explaining repayment plans to a village group.",
  },
  {
    src: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    title: "Client onboarding",
    caption: "New borrowers signing digital agreements in the branch.",
  },
  {
    src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
    title: "Portfolio review",
    caption: "Managers reviewing portfolio health and approval trends.",
  },
  {
    src: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    title: "Field disbursement",
    caption: "Microloans disbursed on-site using mobile devices.",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1200&q=80",
    title: "Operations war-room",
    caption: "Real-time dashboard driving approvals and collections.",
  },
];

const ExtraSection2 = () => {
  const [active, setActive] = useState(0);

  // auto-play gallery
  useEffect(() => {
    const id = setInterval(
      () => setActive((prev) => (prev + 1) % galleryItems.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const current = galleryItems[active];

  return (
    <section className="max-w-6xl mx-auto px-4 my-20">
      <div className="grid md:grid-cols-[1.05fr,1.1fr] gap-10 items-center">
        {/* LEFT : premium text section */}
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-purple-500 mb-3">
            Modern microfinance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Make every{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              microloan journey
            </span>{" "}
            feel effortless.
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-3">
            LoanLink connects field officers, branch managers and HQ into a
            single, live view of your portfolio – from first application to
            final repayment.
          </p>
          <p className="text-sm md:text-base text-gray-600">
            The live gallery shows how real teams work with digital tools in
            the field: onboarding clients, approving loans and monitoring risk
            without spreadsheets or email chaos.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-xs md:text-sm">
            <div className="rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3">
              <p className="text-purple-600 font-semibold mb-1">
                60% faster
              </p>
              <p className="text-gray-700">
                approval workflows once teams move off paper.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3">
              <p className="text-indigo-600 font-semibold mb-1">
                24/7 visibility
              </p>
              <p className="text-gray-700">
                into pending, approved and overdue applications.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <p className="text-emerald-600 font-semibold mb-1">
                Field-ready
              </p>
              <p className="text-gray-700">
                works smoothly on low-bandwidth rural connections.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT : premium gallery card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/40 via-indigo-500/30 to-sky-400/40 blur-2xl opacity-50 pointer-events-none" />

          <div className="relative bg-base-100 rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(15,23,42,0.25)] overflow-hidden">
            <div className="p-4 md:p-5 flex gap-4 md:gap-5 items-stretch backdrop-blur-sm bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950">
              {/* main preview */}
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.src}
                    src={current.src}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* top badge */}
                <div className="absolute left-3 top-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] text-slate-100 border border-white/10">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live microloan moment
                  </span>
                </div>

                {/* bottom overlay caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-[11px] uppercase tracking-wide text-slate-300/80">
                    {active + 1} / {galleryItems.length} • Portfolio in action
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {current.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-100/90">
                    {current.caption}
                  </p>
                </div>
              </div>

              {/* thumbnails sidebar */}
              <div className="w-20 md:w-24 flex flex-col gap-3">
                {galleryItems.map((item, idx) => {
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={`relative rounded-xl overflow-hidden border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        isActive
                          ? "border-purple-400/90 shadow-lg scale-[1.03]"
                          : "border-white/10 hover:border-purple-300/80 hover:scale-[1.02] opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-14 w-full object-cover"
                      />
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* progress dots */}
            <div className="flex items-center justify-center gap-1.5 py-3 bg-slate-900">
              {galleryItems.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === active
                      ? "w-5 bg-purple-400"
                      : "w-2 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraSection2;
