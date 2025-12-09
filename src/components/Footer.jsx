// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
  FaGithub,
  FaWhatsapp,
  FaRedditAlien,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 pt-10">
      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-10 text-sm">
        {/* Logo + About + Social */}
        <div>
          <h2 className="font-extrabold text-2xl mb-3 flex items-center gap-1">
            <span className="text-primary">Loan</span>
            <span className="text-secondary">Link</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            LoanLink – Microloan Request & Approval Tracker System — from
            request to approval and repayment tracking. Designed for small teams
            & growing organizations.
          </p>

          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <SocialIcon href="#" label="Facebook">
              <FaFacebookF size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="Twitter / X">
              <FaTwitter size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <FaInstagram size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <FaLinkedinIn size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="YouTube">
              <FaYoutube size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="Pinterest">
              <FaPinterestP size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="WhatsApp">
              <FaWhatsapp size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="GitHub">
              <FaGithub size={14} />
            </SocialIcon>
            <SocialIcon href="#" label="Reddit">
              <FaRedditAlien size={14} />
            </SocialIcon>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="/all-loans"
                className="hover:text-primary hover:underline"
              >
                Browse Loans
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary hover:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <button className="hover:text-primary hover:underline">
                Help Center
              </button>
            </li>
            <li>
              <button className="hover:text-primary hover:underline">
                Privacy Policy
              </button>
            </li>
            <li>
              <button className="hover:text-primary hover:underline">
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Info</h3>
          <p className="text-gray-600">
            Email: towhiduzzamanplabon@gmai.com <br />
            Phone: +880 1723 912 972 <br />
            Address: Dinajpur, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs flex flex-col md:flex-row justify-between items-center gap-2 text-gray-500">
          <span>
            © {new Date().getFullYear()} LoanLink — All rights reserved.
          </span>

          <span className="flex items-center gap-1">
            Crafted with <span className="text-red-500">❤️</span> by{" "}
            <span className="font-semibold text-primary">
              Towhiduzzaman Plabon
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

// ছোট reusable Social Icon component
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border text-gray-700
               hover:bg-primary hover:text-white hover:scale-110 transition transform cursor-pointer"
  >
    {children}
  </a>
);

export default Footer;
