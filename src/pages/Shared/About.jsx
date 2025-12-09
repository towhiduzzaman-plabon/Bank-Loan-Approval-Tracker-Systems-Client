// src/pages/Shared/About.jsx
import React, { useState, useEffect } from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-3">About LoanLink</h1>
      <p className="text-sm text-gray-600 mb-2">
        LoanLink is a microloan request & approval tracker built as a full-stack
        project to demonstrate real-world loan management workflow.
      </p>
      <p className="text-sm text-gray-600">
        It supports different roles like Admin, Manager and Borrower along with
        secure login, Stripe payments, and responsive dashboards.
      </p>
    </div>
  );
};

export default About;
