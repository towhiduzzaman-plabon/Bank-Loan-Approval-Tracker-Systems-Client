// src/pages/Home/ExtraSection2.jsx
import React, { useState, useEffect } from "react";


const ExtraSection2 = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 my-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to modernize your microloan workflow?
          </h2>
          <p className="text-sm text-gray-600">
            LoanLink is designed for small teams – easy to onboard, simple to
            use, and powerful enough for serious tracking.
          </p>
        </div>
        <div className="flex md:justify-end gap-3">
          <a href="#top" className="btn btn-outline btn-sm md:btn-md">
            View Dashboard Demo
          </a>
          <a href="/all-loans" className="btn btn-primary btn-sm md:btn-md">
            Explore Loans
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection2;
