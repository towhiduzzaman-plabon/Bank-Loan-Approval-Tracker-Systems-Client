// src/pages/Home/AnalyticsTeaser.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", pending: 40, approved: 18 },
  { month: "Feb", pending: 32, approved: 24 },
  { month: "Mar", pending: 27, approved: 32 },
  { month: "Apr", pending: 22, approved: 36 },
  { month: "May", pending: 18, approved: 40 },
  { month: "Jun", pending: 15, approved: 44 },
];

const AnalyticsTeaser = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // auto-play করে active month ঘোরানো
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const activePoint = data[activeIndex];

  return (
    <section className="max-w-6xl mx-auto px-4 mt-16 mb-20">
      <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
        {/* LEFT : animated chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-7"
        >
          <div className="flex items-center justify-between mb-4 gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-purple-500 mb-1">
                Live overview
              </p>
              <h3 className="text-lg md:text-xl font-bold">
                Applications trend
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Pending vs approved applications over the last 6 months.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">
                Focus month
              </p>
              <p className="text-sm font-semibold">{activePoint.month}</p>
            </div>
          </div>

          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#F97316"
                  strokeWidth={2.4}
                  dot={(props) => {
                    const { cx, cy, index } = props;
                    const isActive = index === activeIndex;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 5 : 3}
                        fill={isActive ? "#F97316" : "#FED7AA"}
                        stroke="#fff"
                        strokeWidth={1.2}
                      />
                    );
                  }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#6366F1"
                  strokeWidth={2.4}
                  dot={(props) => {
                    const { cx, cy, index } = props;
                    const isActive = index === activeIndex;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 5 : 3}
                        fill={isActive ? "#6366F1" : "#C7D2FE"}
                        stroke="#fff"
                        strokeWidth={1.2}
                      />
                    );
                  }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* নিচে ছোট স্ট্যাট কার্ড – active month অনুযায়ী */}
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="rounded-2xl bg-orange-50 px-4 py-3 border border-orange-100">
              <p className="text-[11px] uppercase tracking-wide text-orange-500 mb-1">
                Pending
              </p>
              <p className="text-lg font-bold">{activePoint.pending}</p>
              <p className="text-[11px] text-orange-700">
                applications waiting for decision
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-50 px-4 py-3 border border-indigo-100">
              <p className="text-[11px] uppercase tracking-wide text-indigo-500 mb-1">
                Approved
              </p>
              <p className="text-lg font-bold">{activePoint.approved}</p>
              <p className="text-[11px] text-indigo-700">
                applications already approved
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT : শুধু টেক্সট ও মিনি-স্ট্যাটস */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-purple-500">
            Analytics preview
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            Ready to modernize your
            <span className="text-purple-600"> microloan workflow?</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            LoanLink gives you instant insight into how many applications are
            pending, approved or rejected – so your team can react in real time
            instead of guessing from spreadsheets.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="rounded-2xl border border-base-200 bg-base-100 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">
                Avg approval time (last 30 days)
              </p>
              <p className="text-xl font-semibold">1.8 days</p>
            </div>
            <div className="rounded-2xl border border-base-200 bg-base-100 px-4 py-3">
              <p className="text-xs text-gray-500 mb-1">
                Approval rate this month
              </p>
              <p className="text-xl font-semibold">68%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsTeaser;
