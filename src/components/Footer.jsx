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
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-16 pt-10">
      {/* Top Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-10 text-sm">
        {/* COLUMN 1: Logo + About + Social + Store Badges */}
        <div className="flex flex-col">
          {/* Logo */}
          <h2 className="font-extrabold text-2xl mb-3 flex items-center gap-1">
            <span className="text-primary">Loan</span>
            <span className="text-secondary">Link</span>
          </h2>

          {/* About text */}
          <p className="text-gray-600 leading-relaxed mb-5">
            LoanLink – Microloan Request & Approval Tracker System — from
            request to approval and repayment tracking. Designed for small
            teams & growing organizations.
          </p>

          {/* Social Icons – 3x3 grid style */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex gap-3">
              <SocialIcon href="#" label="Facebook" color="#1877F2">
                <FaFacebookF size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="Twitter / X" color="#1DA1F2">
                <FaTwitter size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram" color="#E4405F">
                <FaInstagram size={14} />
              </SocialIcon>
            </div>
            <div className="flex gap-3">
              <SocialIcon href="#" label="LinkedIn" color="#0A66C2">
                <FaLinkedinIn size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube" color="#FF0000">
                <FaYoutube size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="Pinterest" color="#BD081C">
                <FaPinterestP size={14} />
              </SocialIcon>
            </div>
            <div className="flex gap-3">
              <SocialIcon href="#" label="WhatsApp" color="#25D366">
                <FaWhatsapp size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="GitHub" color="#000000">
                <FaGithub size={14} />
              </SocialIcon>
              <SocialIcon href="#" label="Reddit" color="#FF4500">
                <FaRedditAlien size={14} />
              </SocialIcon>
            </div>
          </div>

          {/* Store Badges – inline, নিচের দিকে */}
          <div className="flex gap-4">
            {/* Google Play */}
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-black text-white 
                         px-4 py-2 shadow-md hover:opacity-80 transition"
            >
              <FaGooglePlay size={18} />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase opacity-70">GET IT ON</div>
                <div className="text-[13px] font-semibold">Google Play</div>
              </div>
            </a>

            {/* App Store */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-black text-white 
                         px-4 py-2 shadow-md hover:opacity-80 transition"
            >
              <FaApple size={20} />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase opacity-70">
                  DOWNLOAD ON THE
                </div>
                <div className="text-[13px] font-semibold">App Store</div>
              </div>
            </a>
          </div>
        </div>

        {/* COLUMN 2: Useful Links */}
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

        {/* COLUMN 3: Support */}
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
                Terms &amp; Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: Contact Info */}
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
      <div className="border-top border-base-300 border-t">
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

/**
 * Reusable Social Icon component
 * - color prop দিয়ে background set করা হচ্ছে
 */
const SocialIcon = ({ href, label, color, children }) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-full shadow border 
               hover:scale-110 transition cursor-pointer"
    style={{ backgroundColor: color, color: "#fff" }}
  >
    {children}
  </a>
);

export default Footer;
