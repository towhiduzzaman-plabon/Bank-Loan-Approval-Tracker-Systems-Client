import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  const { role } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm block ${
      isActive ? "bg-primary text-white" : "hover:bg-base-200"
    }`;

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-base-200/70 border-r flex-col">
        <div className="px-4 py-4 border-b flex items-center justify-between">
          <h2 className="font-extrabold text-lg">
            <span className="text-primary">Loan</span>
            <span className="text-secondary">Link</span>
          </h2>
          <ThemeToggle />
        </div>
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto text-sm">
          {/* Common */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-1">Main</p>
            <div className="flex flex-col gap-1">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/all-loans" className={linkClass}>
                All Loans
              </NavLink>
              <NavLink to="/dashboard/profile" className={linkClass}>
                My Profile
              </NavLink>
            </div>
          </div>

          {/* Borrower */}
          {role === "borrower" && (
            <div>
              <p className="text-xs uppercase text-gray-400 mb-1">Borrower</p>
              <div className="flex flex-col gap-1">
                <NavLink to="/dashboard/my-loans" className={linkClass}>
                  My Loans
                </NavLink>
              </div>
            </div>
          )}

          {/* Manager */}
          {role === "manager" && (
            <div>
              <p className="text-xs uppercase text-gray-400 mb-1">Manager</p>
              <div className="flex flex-col gap-1">
                <NavLink to="/dashboard/add-loan" className={linkClass}>
                  Add Loan
                </NavLink>
                <NavLink to="/dashboard/manage-loans" className={linkClass}>
                  Manage Loans
                </NavLink>
                <NavLink to="/dashboard/pending-loans" className={linkClass}>
                  Pending Applications
                </NavLink>
                <NavLink to="/dashboard/approved-loans" className={linkClass}>
                  Approved Applications
                </NavLink>
              </div>
            </div>
          )}

          {/* Admin */}
          {role === "admin" && (
            <div>
              <p className="text-xs uppercase text-gray-400 mb-1">Admin</p>
              <div className="flex flex-col gap-1">
                <NavLink to="/dashboard/manage-users" className={linkClass}>
                  Manage Users
                </NavLink>
                <NavLink to="/dashboard/all-loan" className={linkClass}>
                  All Loans
                </NavLink>
                <NavLink
                  to="/dashboard/loan-applications"
                  className={linkClass}
                >
                  Loan Applications
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-base-100 sticky top-0 z-30">
          <h2 className="font-bold text-base">Dashboard</h2>
          <ThemeToggle />
        </div>

        <main className="flex-1 p-3 sm:p-4 md:p-6 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
