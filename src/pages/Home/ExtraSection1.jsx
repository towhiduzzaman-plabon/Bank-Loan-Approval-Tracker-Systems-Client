// src/pages/Home/ExtraSection1.jsx
import { FiTrendingUp, FiShield } from "react-icons/fi";
import React, { useState, useEffect } from "react";


const ExtraSection1 = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 my-10 grid md:grid-cols-2 gap-6">
      <div className="bg-base-100 border rounded-3xl p-5 shadow-sm flex gap-3">
        <div className="mt-1">
          <FiTrendingUp className="text-3xl text-primary" />
        </div>
        <div>
          <h3 className="font-bold mb-1">Data-driven Decisions</h3>
          <p className="text-xs text-gray-500">
            Quickly see how many applications are pending, approved or rejected
            so your team can focus on what matters.
          </p>
        </div>
      </div>
      <div className="bg-base-100 border rounded-3xl p-5 shadow-sm flex gap-3">
        <div className="mt-1">
          <FiShield className="text-3xl text-primary" />
        </div>
        <div>
          <h3 className="font-bold mb-1">Secure & Role Based</h3>
          <p className="text-xs text-gray-500">
            Separate dashboards for admin, managers and borrowers with secured
            JWT + Firebase authentication.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection1;
