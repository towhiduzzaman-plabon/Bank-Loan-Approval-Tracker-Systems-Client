// src/components/Footer.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";



const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h2 className="font-extrabold text-xl mb-2">
            <span className="text-primary">Loan</span>
            <span className="text-secondary">Link</span>
          </h2>
          <p className="text-gray-500">
            Smart microloan management – from request to approval and repayment
            tracking in one place.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/all-loans" className="hover:text-primary">
                Browse Loans
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-500">
            Email: support@loanlink.app
            <br />
            Phone: +880-1723-912-972
          </p>
        </div>
      </div>
      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs flex flex-col md:flex-row justify-between text-gray-500 gap-2">
          <span>© {new Date().getFullYear()} LoanLink. All rights reserved.</span>
          <span>Made for recruitment project.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
