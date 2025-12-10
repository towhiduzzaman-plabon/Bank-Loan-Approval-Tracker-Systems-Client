import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiTrendingUp, FiShield, FiUsers } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";

  // ---------- LOGIN (same as before) ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await signIn(email, password);
      const user = result.user;

      await axiosPublic.post("/api/auth/jwt", {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      Swal.fire("Success", "Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Invalid email or password", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------- GOOGLE LOGIN (same as before) ----------
  const handleGoogle = async () => {
    try {
      setLoading(true);

      const result = await googleSignIn();
      const user = result.user;

      await axiosPublic.post("/api/auth/jwt", {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      Swal.fire("Success", "Logged in with Google", "success");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-base-200/70 px-4 py-10">
      <div className="w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT: Illustration + financial theme graphics (NO external image) */}
        <div className="hidden md:block relative bg-gradient-to-br from-purple-700 via-indigo-600 to-sky-500 text-white">
          {/* subtle circles */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 right-0 w-40 h-40 rounded-full bg-yellow-400/30 blur-2xl" />

          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Top text */}
            <div>
              <p className="text-xs uppercase tracking-[0.35em] mb-3 text-purple-200">
                LoanLink
              </p>
              <h2 className="text-2xl font-bold leading-snug">
                Smart Microloan
                <br />
                Management Platform
              </h2>
              <p className="mt-3 text-sm text-gray-100 max-w-sm">
                Track loan requests, approvals and repayments with a clean,
                audit-friendly dashboard for admins, managers and borrowers.
              </p>
            </div>

            {/* Animated “cards” illustration */}
            <div className="mt-8 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <FiTrendingUp className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-200">Total Active Loans</p>
                    <p className="text-sm font-semibold">256 this month</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-200">+18%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <FiShield className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-200">Secure Decisions</p>
                    <p className="text-sm font-semibold">
                      Role-based approvals
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-100">Admin · Manager</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur px-4 py-3 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <FiUsers className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-200">Borrowers</p>
                    <p className="text-sm font-semibold">
                      1.2k+ active profiles
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-100">Live tracking</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="px-6 py-8 md:px-10 md:py-10 flex items-center">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome back to LoanLink
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Log in to access your LoanLink dashboard and manage your loans.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-base-100"
                  required
                />
                <div className="flex justify-end mt-1">
                  <button
                    type="button"
                    className="text-[11px] text-purple-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 rounded-xl normal-case font-semibold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ORIGINAL STYLE GOOGLE BUTTON (SVG) */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className={`w-full rounded-xl py-2.5 px-3 text-sm font-medium flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 hover:shadow-md transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {/* Google "G" SVG – no external image */}
              <span className="w-5 h-5">
                <svg
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35 16.8 35 11 29.2 11 22S16.8 9 24 9c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.6 3 29.6 1 24 1 12.4 1 3 10.4 3 22s9.4 21 21 21 21-9.4 21-21c0-1.3-.1-2.5-.4-3.7z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.4 15.1 18.7 11 24 11c3.3 0 6.3 1.3 8.6 3.2l5.7-5.7C34.6 3 29.6 1 24 1 16 1 9.2 5.4 6.3 12.1c-.6 1.5-1 3.1-1.2 4.8z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 43c5.3 0 10.2-2 13.8-5.2l-6.4-4.9C29.5 34.3 26.9 35 24 35c-5.2 0-9.5-3.4-11-8.1l-6.6 5C9.3 38.8 16 43 24 43z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.4 5.9l.1-.1 6.4 4.9C37 40.5 42 37 44.7 31.6c.9-1.9 1.3-4.1 1.3-6.6 0-1.3-.1-2.5-.4-3.7z"
                  />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>

            <p className="text-xs text-center mt-5 text-gray-500">
              New to LoanLink?{" "}
              <Link to="/register" className="link link-primary font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
