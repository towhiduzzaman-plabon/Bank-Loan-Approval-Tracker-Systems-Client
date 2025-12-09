import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, role, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary transition-colors";

  return (
    <header className="bg-base-100 border-b sticky top-0 z-40">
      <nav className="navbar max-w-6xl mx-auto px-3 sm:px-4">
        {/* Left - Logo */}
        <div className="flex-1">
          <Link
            to="/"
            className="font-extrabold text-xl sm:text-2xl tracking-tight whitespace-nowrap"
          >
            <span className="text-primary">Loan</span>
            <span className="text-secondary">Link</span>
          </Link>
        </div>

        {/* Center - Desktop Links */}
        <div className="hidden md:flex gap-5 mr-4 text-sm items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-loans" className={navLinkClass}>
            All Loans
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Right side - theme + auth */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {/* Desktop auth buttons */}
          {!user ? (
            <div className="hidden md:flex gap-2">
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 sm:w-10 rounded-full">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/4JVK4fK/default-avatar.png"
                      }
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li className="mb-1">
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold">
                        {user.displayName || "User"}
                      </span>
                      <span className="text-gray-500 truncate">
                        {user.email}
                      </span>
                      {role && (
                        <span className="badge badge-outline mt-1 self-start uppercase">
                          {role}
                        </span>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile menu (md:hidden) */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li>
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-loans" className={navLinkClass}>
                  All Loans
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {!user && (
                <>
                  <li>
                    <NavLink to="/login" className={navLinkClass}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={navLinkClass}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
