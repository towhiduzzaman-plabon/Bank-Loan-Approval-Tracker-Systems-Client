// src/pages/Home/ExtraSection1.jsx
import React, { useState } from "react";

const tabs = ["Management", "Board of Directors", "Advisory Board"];

const teamMembers = [
  // MANAGEMENT
  {
    id: 1,
    name: "Engg.Towhiduzzaman Plabon",
    title: "Co-Founder & CEO",
    type: "Management",
    photo: "https://i.ibb.co.com/5m2QGxD/mypassport.jpg",
    bio: "Leads overall strategy, partnerships and product vision for LoanLink.",
  },
  {
    id: 2,
    name: "TZ PLabon",
    title: "Head of Microfinance Operations",
    type: "Management",
    photo: "https://i.ibb.co.com/Xwxq2Fq/profile.jpg",
    bio: "Works with field officers to keep approvals, collections and risk on track.",
  },
  {
    id: 3,
    name: "PlayBoy",
    title: "Risk & Compliance Lead",
    type: "Management",
    photo: "https://i.ibb.co.com/5m2QGxD/mypassport.jpg",
    bio: "Designs policies to keep portfolios healthy and borrowers protected.",
  },

  // BOARD
  {
    id: 4,
    name: "Imran Malik",
    title: "Chair, Board of Directors",
    type: "Board of Directors",
    photo:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    bio: "Former MFI CEO, advising on scale, governance and impact.",
  },
  {
    id: 5,
    name: "Farzana Akter",
    title: "Independent Director",
    type: "Board of Directors",
    photo:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=900&q=80",
    bio: "Brings experience from social enterprise and rural finance.",
  },

  // ADVISORY
  {
    id: 6,
    name: "Dr. TZ Plabon",
    title: "Advisor, Data & Analytics",
    type: "Advisory Board",
    photo:
      "https://i.ibb.co.com/5m2QGxD/mypassport.jpg",
    bio: "Helps LoanLink design credit scoring and portfolio dashboards.",
  },
];

const ExtraSection1 = () => {
  const [activeTab, setActiveTab] = useState("Management");

  const filtered = teamMembers.filter((m) => m.type === activeTab);

  return (
    <section className="max-w-6xl mx-auto px-4 my-16">
      {/* Heading + intro */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Our Management Team
        </h2>
        <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-600">
          LoanLink is led by a team of microfinance operators, technologists and
          advisors who care about transparent lending and data-driven decisions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-base-300 mb-8">
        <div className="flex gap-6 text-sm md:text-base">
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  "pb-3 px-1 border-b-2 transition-all " +
                  (active
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-800")
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="bg-slate-900 rounded-3xl px-4 md:px-8 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-base-100 rounded-3xl overflow-hidden shadow-lg flex flex-col"
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-base md:text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-wide text-primary mb-2">
                  {member.title}
                </p>
                <p className="text-xs md:text-sm text-gray-600 flex-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection1;
